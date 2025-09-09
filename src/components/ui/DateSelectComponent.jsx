import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "./button";
import { Calendar } from "lucide-react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const DateSelectComponent = ({ data, onSave }) => {
  const [date, setDate] = useState(
    data?.dueDate ? new Date(data.dueDate) : null
  );
    useEffect(() => {
    if (data?.dueDate) {
      setDate(new Date(data.dueDate));
    }
  }, [data?.dueDate]);

  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (date) {
      if (onSave) {
        onSave(date);
      } else {
        console.log("Selected date:", date.toISOString());
      }
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center gap-1 text-sm text-blue-500'
        >
          <Calendar size={14} />
          {date ? format(date, "d MMM") : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-3' align='start'>
        <ShadcnCalendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className='flex justify-end gap-2 mt-3'>
          <Button variant='outline' size='sm' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size='sm' onClick={handleSave}>
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateSelectComponent;
