import axios from "axios";
import { toast } from "sonner";


export const getMyTasks = async (setMyTasks) => {
  const userId = localStorage.getItem("userId");
  try {
    const res = await axios.get(
      `http://localhost:3000/api/task/getMyTasks/${userId}`
    );
    if (res.status === 200) {
      setMyTasks(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};


export const handleAddTask = async (name, setName, desc, setDesc, date, priority, setPriority, selectedTags, setSelectedTags, getMyTasks, setOpen, setDate) => {

  const userId = localStorage.getItem("userId");
  try {
    const res = await axios.post("http://localhost:3000/api/task/add", {
      task: name,
      description: desc,
      dueDate: date ? date.toISOString() : null,
      priority,
      tags: selectedTags,
      user: userId,
    });
    if (res.status === 201) {
      setName("");
      setDesc("");
      setDate(null);
      setPriority("none");
      setSelectedTags([]);
      toast.success("Task added successfully");
      await getMyTasks();
      setOpen(false);
    } else {
      toast.error("Failed to add task");
    }
  } catch (error) {
    console.log(error);
    if(error.response && error.response.status === 400){
      toast.error(error.response.data.message)
    }
  }
};

export const handleTrash = async (id, getMyTasks) => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/task/trash/${id}`
    );
    if (res.status === 200) {
      toast.success(res.data.message);
      getMyTasks();
    }
  } catch {
    toast.error("Error deleting task");
  }
};


export const handleCheck = async (id, setIsChecked, getMyTasks) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/task/toggleTaskCompletion/${id}`
    );
    if (res.status === 200) {
      toast.success(res.data.message);
      setIsChecked(res.data.data.isCompleted);
      getMyTasks();
    }
  } catch {
    toast.error("Error marking task as completed");
  }
};
export const handleCheck2 = async (id, getMyTasks) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/task/toggleTaskCompletion/${id}`
    );
    if (res.status === 200) {
      toast.success(res.data.message);
      getMyTasks();
    }
  } catch {
    toast.error("Error marking task as completed");
  }
};


export const handleSaveDate = async (id, date, getMyTasks, setOpen) => {
  if (!date) return;
  try {
    const res = await axios.put(
      `http://localhost:3000/api/task/updateTask/${id}`,
      { dueDate: date }
    );
    if (res.status === 200) {
      toast.success("Date updated successfully");
      getMyTasks();
      setOpen(false);
    }
  } catch {
    toast.error("Error updating date");
  }
};


export const handleSetPriority = async (id, newPriority, setPriority, getMyTasks) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/task/updateTask/${id}`,
      { priority: newPriority }
    );
    if (res.status === 200) {
      toast.success("Priority updated");
      setPriority(newPriority);
      getMyTasks();
    }
  } catch {
    toast.error("Error updating priority");
  }
};
export const handleSetPriority2 = async (id, newPriority, getMyTasks) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/task/updateTask/${id}`,
      { priority: newPriority }
    );
    if (res.status === 200) {
      toast.success("Priority updated");
      getMyTasks();
    }
  } catch {
    toast.error("Error updating priority");
  }
};


export const getSpecificTask = async (taskId, setTaskNotes, setTaskName, setTaskDescription) => {
  if (!taskId) return;
  try {
    const res = await axios.get(
      `http://localhost:3000/api/task/getTask/${taskId}`
    );
    if (res.status === 200) {
      setTaskNotes(res.data.data);
      setTaskName(res.data.data.task);
      setTaskDescription(res.data.data.description);
    }
  } catch (error) {
    console.error("Error fetching task:", error);
  }
};

export const handleUpdateTask = async (taskId, taskName, taskDescription, setTaskNotes, getMyTasks) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/task/updateTask/${taskId}`,
      { task: taskName, description: taskDescription }
    );
    if (res.status === 200) {
      setTaskNotes((prev) => ({ ...prev, task: taskName, description: taskDescription }));
      toast.success(res.data.message);
      getMyTasks();
    }
  } catch (error) {
    console.error("Error updating task name:", error);
  }
};

export const getPendingTasks = (myTasks) =>
  myTasks.filter((task) => {
    if (!task.dueDate) return false;
    const due = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !task.isCompleted && !task.isDeleted && due < today;
  });


export const getTodayTasks = (myTasks) =>
  myTasks.filter((task) => {
    if (!task.dueDate) return false;
    const due = new Date(task.dueDate);
    const now = new Date();
    return (
      !task.isCompleted &&
      !task.isDeleted &&
      due.toDateString() === now.toDateString()
    );
  });

export const getUpcomingTasks = (myTasks) =>
  myTasks.filter((task) => {
    if (!task.dueDate) return false;
    const due = new Date(task.dueDate);
    return !task.isCompleted && !task.isDeleted && due > new Date();
  });


export const deleteAllCompletedTasks = async (setMyTasks) => {
  const userId = localStorage.getItem("userId");
  try {
    const res = await axios.delete(`http://localhost:3000/api/task/deleteAllCompletedTasks/${userId}`);
    
    toast.success("All completed tasks deleted");
    getMyTasks(setMyTasks);

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete completed tasks");
  }
};


export const deleteAllDeletedTasks = async (setMyTasks) => {
  const userId = localStorage.getItem('userId')
  try {
    await axios.delete(`http://localhost:3000/api/task/deleteAllTrashTasks/${userId}`); 
    toast.success("All Trash tasks deleted");
    getMyTasks(setMyTasks);
  } catch (err) {
    console.error("Error deleting trashed tasks:", err);
  }
};

