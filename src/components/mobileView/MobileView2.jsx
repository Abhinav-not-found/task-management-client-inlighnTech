import { useEffect, useState } from "react";

import TodoElement from "../task/TodoElement";

import { getMyTasks } from "../../helper/Task.helper";

const MobileView2 = () => {
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    getMyTasks(setMyTasks);
  }, []);
  return (
    <div className='h-screen p-1'>
      {myTasks.filter((task) => task.isCompleted).length > 0 ? (
        myTasks
          .filter((task) => task.isCompleted)
          .map((task) => (
            <TodoElement
              key={task._id}
              data={task}
              getMyTasks={() => getMyTasks(setMyTasks)}
            />
          ))
      ) : (
        <p className='text-center text-muted-foreground'>
          No completed tasks available
        </p>
      )}
    </div>
  );
};

export default MobileView2;
