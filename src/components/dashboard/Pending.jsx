import AccordionComponent from "../ui/AccordionComponent";
import { getMyTasks, getPendingTasks } from "../../helper/Task.helper";
import TodoElement from "../task/TodoElement";

const Pending = ({ myTasks, setMyTasks }) => {
  const pendingTasks = getPendingTasks(myTasks);

  return (
    <AccordionComponent text='pending' number={pendingTasks.length}>
      {pendingTasks.length > 0 ? (
        pendingTasks.map((task) => (
          <TodoElement
            key={task._id}
            data={task}
            getMyTasks={() => getMyTasks(setMyTasks)}
          />
        ))
      ) : (
        <p className='text-center text-muted-foreground'>No task available</p>
      )}
    </AccordionComponent>
  );
};

export default Pending;
