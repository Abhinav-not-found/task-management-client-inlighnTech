import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TodoElement from "../task/TodoElement";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MobileView4 = () => {
  const { id } = useParams();
  const [tagTasks, setTagTasks] = useState([]);

  const getTasksByTag = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.get(
        `${API_BASE_URL}:3000/api/tag/getTasksByTag/${id}?userId=${userId}`
      );
      if (res.status === 200) {
        setTagTasks(res.data.tasks);
        setTagInfo(res.data.tag);
      }
    } catch (error) {
      console.error("Error fetching tasks by tag:", error);
    }
  };

  useEffect(() => {
    getTasksByTag();
  }, [id]);
  return (
    <div className='block h-screen p-1'>
      {tagTasks.length > 0 ? (
        tagTasks
          .filter((task) => !task.isDeleted)
          .map((task) => (
            <TodoElement
              key={task._id}
              data={task}
              getMyTasks={getTasksByTag}
            />
          ))
      ) : (
        <p className='text-center text-muted-foreground'>
          No tasks available for this tag
        </p>
      )}
    </div>
  );
};

export default MobileView4;
