import { Ellipsis, Trash, Calendar, Flag, Tag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import {
  handleCheck,
  handleSaveDate,
  handleSetPriority,
  handleTrash,
} from "../../helper/Task.helper";
import TaskNotes from "./TaskNotes";

/* ---------- Subcomponents ---------- */

const TaskCheckbox = ({ taskId, task, isChecked, setIsChecked, getMyTasks }) => (
  <div className="flex gap-2">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(e) => {
        setIsChecked(e.target.checked);
        handleCheck(taskId, setIsChecked, getMyTasks);
      }}
      className="size-4 mt-0.5 cursor-pointer accent-stone-500"
    />
    <p className="text-sm w-full flex items-center gap-1">{task}</p>
  </div>
);

const TaskTags = ({ tags }) => (
  <div className="flex items-center gap-1 mt-1">
    {tags.slice(0, 1).map((tag) => (
      <span key={tag}>
        <Tag
          size={14}
          className={`mr-1 ${
            tag.color === "red"
              ? "text-red-500"
              : tag.color === "green"
              ? "text-green-500"
              : tag.color === "blue"
              ? "text-blue-500"
              : tag.color === "yellow"
              ? "text-yellow-500"
              : tag.color === "purple"
              ? "text-purple-500"
              : "text-gray-400"
          }`}
        />
      </span>
    ))}
    {tags.length > 1 && (
      <span className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-xs">
        +{tags.length - 1}
      </span>
    )}
  </div>
);

const TaskPriorityFlag = ({ priority }) =>
  priority !== "none" && (
    <Flag
      size={14}
      className={
        priority === "high"
          ? "text-red-500"
          : priority === "medium"
          ? "text-yellow-500"
          : "text-blue-500"
      }
    />
  );

const TaskDatePicker = ({ taskId, date, setDate, getMyTasks }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-sm text-blue-500"
        >
          <Calendar size={14} />
          {date ? format(date, "d MMM") : "Set date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <ShadcnCalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() =>
              handleSaveDate(taskId, date, getMyTasks, setOpen)
            }
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const TaskActionsDropdown = ({
  taskId,
  priority,
  setPriority,
  getMyTasks,
  showTrash,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="px-1 py-2 cursor-pointer">
      <Ellipsis size={12} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <div className="w-full h-fit">
        <p className="text-muted-foreground text-xs ml-2 mt-2">Priority</p>
        <div className="flex justify-between">
          {["high", "medium", "low", "none"].map((level) => (
            <Button
              key={level}
              variant="ghost"
              onClick={() =>
                handleSetPriority(taskId, level, setPriority, getMyTasks)
              }
              className={
                priority === level
                  ? "bg-stone-100 dark:bg-stone-700"
                  : ""
              }
            >
              <Flag
                className={
                  level === "high"
                    ? "text-red-500"
                    : level === "medium"
                    ? "text-yellow-500"
                    : level === "low"
                    ? "text-blue-500"
                    : ""
                }
              />
            </Button>
          ))}
        </div>
        <hr className="my-1" />
        {showTrash && (
          <button
            onClick={() => handleTrash(taskId, getMyTasks)}
            className="flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950 p-2 rounded-md w-full group"
          >
            <Trash
              size={17}
              className="text-muted-foreground group-hover:text-red-500"
            />
            <p className="text-sm text-stone-700 group-hover:text-red-500">
              Trash
            </p>
          </button>
        )}
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);

const TaskContent = ({
  data,
  isChecked,
  setIsChecked,
  date,
  setDate,
  priority,
  setPriority,
  getMyTasks,
  location,
}) => (
  <>
    <TaskCheckbox
      taskId={data._id}
      task={data.task}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      getMyTasks={getMyTasks}
    />
    <div className="flex items-center gap-2">
      <TaskTags tags={data.tags || []} />
      <TaskPriorityFlag priority={priority} />
      <TaskDatePicker
        taskId={data._id}
        date={date}
        setDate={setDate}
        getMyTasks={getMyTasks}
      />
      <TaskActionsDropdown
        taskId={data._id}
        priority={priority}
        setPriority={setPriority}
        getMyTasks={getMyTasks}
        showTrash={location.pathname !== "/trash"}
      />
    </div>
  </>
);

/* ---------- Main Component ---------- */

const TodoElement = ({ data, getMyTasks }) => {
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(data.isCompleted);
  const [date, setDate] = useState(
    data.dueDate ? new Date(data.dueDate) : null
  );
  const [priority, setPriority] = useState(data.priority || "none");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddingTaskIdToParams = (e) => {
    e.stopPropagation();
    searchParams.set("taskId", data._id);
    setSearchParams(searchParams);
  };

  const priorityBg = {
    high: "bg-red-50 dark:bg-red-900",
    medium: "bg-yellow-50 dark:bg-yellow-700/90",
    low: "bg-blue-50 dark:bg-blue-900",
  };

  return (
    <>
      {/* Desktop: normal row */}
      <div
        onClick={handleAddingTaskIdToParams}
        className={`hidden md:flex w-full mb-2 items-center justify-between px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md cursor-pointer ${
          priorityBg[priority] || ""
        }`}
      >
        <TaskContent
          data={data}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          date={date}
          setDate={setDate}
          priority={priority}
          setPriority={setPriority}
          getMyTasks={getMyTasks}
          location={location}
        />
      </div>

      {/* Mobile: open sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <div
            onClick={handleAddingTaskIdToParams}
            className={`flex md:hidden w-full mb-2 items-center justify-between px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md cursor-pointer ${
              priorityBg[priority] || ""
            }`}
          >
            <TaskContent
              data={data}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              date={date}
              setDate={setDate}
              priority={priority}
              setPriority={setPriority}
              getMyTasks={getMyTasks}
              location={location}
            />
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80%] rounded-t-2xl p-4">
          <TaskNotes />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TodoElement;
