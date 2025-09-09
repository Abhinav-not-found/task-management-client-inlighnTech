import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export function DatePickerInline({ date, setDate }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className='relative inline-block' ref={wrapperRef}>
      <Button
        variant='outline'
        className='flex items-center gap-2 text-sm'
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
      >
        <CalendarIcon size={16} />
        {date ? format(date, "d MMM yyyy") : "Set due date"}
      </Button>

      {open && (
        <div
          className='absolute z-50 mt-2 p-2 bg-white dark:bg-neutral-900 rounded-md shadow-lg'
          onClick={(e) => e.stopPropagation()}
        >
          <ShadcnCalendar
            mode='single'
            selected={date}
            onSelect={(d) => {
              if (d) setDate(d);
              setOpen(false);
            }}
            initialFocus
          />
          <div className='flex justify-end gap-2 mt-2'>
            <Button variant='outline' size='sm' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size='sm' onClick={() => setOpen(false)}>
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
