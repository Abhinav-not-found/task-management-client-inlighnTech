import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getSpecificTask,
  handleCheck2,
  handleUpdateTask,
} from "../../helper/Task.helper";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import DateSelectComponent from "../ui/DateSelectComponent";
import PrioritySelectComponent from "../ui/PrioritySelectComponent";

const TaskNotes = ({ getMyTasks }) => {
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");

  const [taskNotes, setTaskNotes] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  useEffect(() => {
    getSpecificTask(taskId, setTaskNotes, setTaskName, setTaskDescription);
  }, [searchParams]);

  return (
    <div className='h-screen min-w-40 p-5'>
      {taskId && (
        <div className='h-10 w-full border-b mb-2 flex justify-between'>
          <div>
            <DateSelectComponent data={taskNotes} />
          </div>
          <div className='flex gap-2'>
            <PrioritySelectComponent data={taskNotes} getMyTasks={getMyTasks} />
            <Button
              onClick={() => handleCheck2(taskNotes._id, getMyTasks)}
              variant={"ghost"}
              className={
                taskNotes.isCompleted
                  ? "bg-green-700 dark:bg-green-800 text-white"
                  : ""
              }
            >
              <Check />
              Completed
            </Button>
          </div>
        </div>
      )}

      {isEditingName ? (
        <input
          type='text'
          value={taskName}
          autoFocus
          onChange={(e) => setTaskName(e.target.value)}
          onBlur={() => {
            setIsEditingName(false);
            handleUpdateTask(
              taskId,
              taskName,
              taskDescription,
              setTaskNotes,
              getMyTasks
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditingName(false);
              handleUpdateTask();
            }
          }}
          className='outline-none w-full text-xl font-semibold border-b border-gray-400'
        />
      ) : (
        <h1
          className='text-xl font-semibold cursor-pointer'
          onClick={() => setIsEditingName(true)}
        >
          {taskNotes.task}
        </h1>
      )}

      {isEditingDesc ? (
        <textarea
          value={taskDescription}
          autoFocus
          onChange={(e) => setTaskDescription(e.target.value)}
          onBlur={() => {
            setIsEditingDesc(false);
            handleUpdateTask(
              taskId,
              taskName,
              taskDescription,
              setTaskNotes,
              getMyTasks
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              setIsEditingDesc(false);
              handleUpdateTask(
                taskId,
                taskName,
                taskDescription,
                setTaskNotes,
                getMyTasks
              );
            }
          }}
          className='outline-none mt-2 resize-none w-full border-b border-gray-400'
          rows={3}
        />
      ) : (
        <p
          className='mt-2 cursor-pointer text-muted-foreground'
          onClick={() => setIsEditingDesc(true)}
        >
          {taskNotes.description}
        </p>
      )}
    </div>
  );
};

export default TaskNotes;
