import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePickerInline } from "../ui/DatePicker";
import { handleAddTask } from "../../helper/Task.helper";
import TaskNameDescFields from "./createTask/TaskNameDescFields";
import TaskPrioritySelector from "./createTask/TaskPrioritySelector";
import TaskTagSelector from "./createTask/TaskTagSelector";
import TaskSubmitButton from "./createTask/TaskSubmitButton";

const CreateTaskComponent = ({ getMyTasks, tags, refreshTags }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("none");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
  if (open) refreshTags();
}, [open]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Create Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a task</DialogTitle>

          <div>
            <TaskNameDescFields
              name={name}
              setName={setName}
              desc={desc}
              setDesc={setDesc}
            />

            <DatePickerInline date={date} setDate={setDate} />

            <TaskPrioritySelector
              priority={priority}
              setPriority={setPriority}
            />

            <TaskTagSelector
              tags={tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />

            <TaskSubmitButton
              onSubmit={() =>
                handleAddTask(
                  name,
                  setName,
                  desc,
                  setDesc,
                  date,
                  priority,
                  setPriority,
                  selectedTags,
                  setSelectedTags,
                  getMyTasks,
                  setOpen,
                  setDate
                )
              }
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskComponent;
