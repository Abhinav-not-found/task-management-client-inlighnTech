import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flag } from "lucide-react";
import { Button } from "./button";
import { handleSetPriority2 } from "../../helper/Task.helper";

const PrioritySelectComponent = ({data, getMyTasks}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <Flag />
        </Button> 
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='flex justify-between h-full'>
          <Button
            variant='ghost'
            onClick={() =>
            handleSetPriority2(data._id, "high", getMyTasks)
            }
          >
            <Flag className='text-red-500' />
          </Button>
          <Button
            variant='ghost'
            onClick={() =>
              handleSetPriority2(data._id, "medium", getMyTasks)
            }
          >
            <Flag className='text-yellow-500' />
          </Button>
          <Button
            variant='ghost'
            onClick={() =>
              handleSetPriority2(data._id, "low", getMyTasks)
            }
          >
            <Flag className='text-blue-500' />
          </Button>
          <Button
            variant='ghost'
            onClick={() =>
              handleSetPriority2(data._id, "none", getMyTasks)
            }
          >
            <Flag />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PrioritySelectComponent;
