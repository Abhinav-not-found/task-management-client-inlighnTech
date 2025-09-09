import AccordionComponent from "../ui/AccordionComponent";
import { getMyTasks, getTodayTasks } from "../../helper/Task.helper";
import TodoElement from "../task/TodoElement";

const Today = ({ myTasks, setMyTasks }) => {
  const todayTasks = getTodayTasks(myTasks);

  return (
    <AccordionComponent text='today' number={todayTasks.length}>
      {todayTasks.length > 0 ? (
        todayTasks.map((task) => (
          <TodoElement
            key={task._id}
            data={task}
            getMyTasks={() => getMyTasks(setMyTasks)}
          />
        ))
      ) : (
        <p className='text-center text-muted-foreground'>No tasks available</p>
      )}
    </AccordionComponent>
  );
};

export default Today;
