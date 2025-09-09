import { useEffect, useState } from "react";
import { getMyTasks } from "../../helper/Task.helper";
import TodoElement from "../task/TodoElement";

const MobileView3 = () => {
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    getMyTasks(setMyTasks);
  }, []);
  return (
    <div className='h-screen p-1'>
      {myTasks.filter((task) => task.isDeleted).length > 0 ? (
        myTasks
          .filter((task) => task.isDeleted)
          .map((task) => (
            <TodoElement
              key={task._id}
              data={task}
              getMyTasks={() => getMyTasks(setMyTasks)}
            />
          ))
      ) : (
        <p className='text-center text-muted-foreground'>
          No trash tasks available
        </p>
      )}
    </div>
  );
};

export default MobileView3;
