import AccordionComponent from "../ui/AccordionComponent";
import { getMyTasks, getUpcomingTasks } from "../../helper/Task.helper";
import TodoElement from "../task/TodoElement";

const Upcoming = ({ myTasks, setMyTasks }) => {
  const upcomingTasks = getUpcomingTasks(myTasks);

  return (
    <AccordionComponent text='upcoming' number={upcomingTasks.length}>
      {upcomingTasks.length > 0 ? (
        upcomingTasks.map((task) => (
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

export default Upcoming;
