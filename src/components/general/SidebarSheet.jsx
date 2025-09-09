import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const SidebarSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className={"block md:hidden"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-40'>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
