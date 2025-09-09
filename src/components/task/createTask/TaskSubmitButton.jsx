import { Button } from "../../ui/button";

const TaskSubmitButton = ({ onSubmit }) => {
  return (
    <div className='flex justify-end mt-4'>
      <Button onClick={onSubmit}>Add</Button>
    </div>
  );
};

export default TaskSubmitButton;
