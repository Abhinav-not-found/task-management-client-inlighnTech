import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const AccordionComponent = ({children,text,number}) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center gap-1 cursor-pointer mt-4'
      >
        {open ? (
          <ChevronDown className='size-5 text-muted-foreground' />
        ) : (
          <ChevronRight className='size-5 text-muted-foreground' />
        )}
        <p className="capitalize select-none font-semibold">{text}<span className="text-muted-foreground ml-2 font-normal">{number}</span></p>
      </div>
      {open && <div>
        {children}
        </div>}
    </>
  );
};

export default AccordionComponent;
