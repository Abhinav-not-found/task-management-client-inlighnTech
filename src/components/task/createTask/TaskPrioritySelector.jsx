import { Button } from "../../ui/button";
import { Flag } from "lucide-react";

const TaskPrioritySelector = ({ priority, setPriority }) => {
  const options = [
    { value: "high", color: "text-red-500" },
    { value: "medium", color: "text-yellow-500" },
    { value: "low", color: "text-blue-500" },
    { value: "none", color: "" },
  ];

  return (
    <div className='mt-2'>
      <label>Priority:</label>
      <div className='flex justify-between w-40'>
        {options.map(({ value, color }) => (
          <Button
            key={value}
            variant='ghost'
            onClick={() => setPriority(value)}
            className={
              priority === value ? "bg-stone-200 dark:bg-stone-700" : ""
            }
          >
            <Flag className={color} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TaskPrioritySelector;
