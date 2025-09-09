import { useEffect, useState } from "react";
import TodoElement from "../../components/task/TodoElement";
import {
  getMyTasks,
  getPendingTasks,
  getTodayTasks,
  getUpcomingTasks,
} from "../../helper/Task.helper";
import AccordionComponent from "../../components/ui/AccordionComponent";
import { getAllTags } from "../../helper/Tag.helper";

const MobileView1 = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getMyTasks(setMyTasks);
    getAllTags(setTags);
  }, []);
  return (
    <div>
      <div className='h-screen p-1 '>
        <AccordionComponent
          text='pending'
          number={getPendingTasks(myTasks).length}
        >
          {myTasks.filter((task) => {
            if (!task.dueDate) return false;
            const due = new Date(task.dueDate);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return !task.isCompleted && !task.isDeleted && due < today;
          }).length > 0 ? (
            myTasks
              .filter((task) => {
                if (!task.dueDate) return false;
                const due = new Date(task.dueDate);

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return !task.isCompleted && !task.isDeleted && due < today;
              })
              .map((task) => (
                <TodoElement
                  key={task._id}
                  data={task}
                  getMyTasks={() => getMyTasks(setMyTasks)}
                />
              ))
          ) : (
            <p className='text-center text-muted-foreground'>
              No task available
            </p>
          )}
        </AccordionComponent>

        {/* today */}
        <AccordionComponent text='today' number={getTodayTasks(myTasks).length}>
          {myTasks.filter((task) => {
            if (!task.dueDate) return false;
            const due = new Date(task.dueDate);
            const now = new Date();
            return (
              !task.isCompleted &&
              !task.isDeleted &&
              due.toDateString() === now.toDateString()
            );
          }).length > 0 ? (
            myTasks
              .filter((task) => {
                if (!task.dueDate) return false;
                const due = new Date(task.dueDate);
                const now = new Date();
                return (
                  !task.isCompleted &&
                  !task.isDeleted &&
                  due.toDateString() === now.toDateString()
                );
              })
              .map((task) => (
                <TodoElement
                  key={task._id}
                  data={task}
                  getMyTasks={() => getMyTasks(setMyTasks)}
                />
              ))
          ) : (
            <p className='text-center text-muted-foreground'>
              No tasks available
            </p>
          )}
        </AccordionComponent>
        {/* upcoming */}
        <AccordionComponent
          text='upcoming'
          number={getUpcomingTasks(myTasks).length}
        >
          {myTasks.filter((task) => {
            if (!task.dueDate) return false;
            const due = new Date(task.dueDate);
            return !task.isCompleted && !task.isDeleted && due > new Date();
          }).length > 0 ? (
            myTasks
              .filter((task) => {
                if (!task.dueDate) return false;
                const due = new Date(task.dueDate);
                const now = new Date();
                return !task.isCompleted && !task.isDeleted && due > now;
              })
              .map((task) => (
                <TodoElement
                  key={task._id}
                  data={task}
                  getMyTasks={() => getMyTasks(setMyTasks)}
                />
              ))
          ) : (
            <p className='text-center text-muted-foreground'>
              No tasks available
            </p>
          )}
        </AccordionComponent>
      </div>
    </div>
  );
};

export default MobileView1;
