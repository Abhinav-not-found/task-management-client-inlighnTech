import { CheckCheck, LayoutDashboard, Trash2 } from "lucide-react";
import SidebarElement from "../general/SidebarElement";
import TagAccordion from "../tag/TagAccordion";
const Sidebar = () => {
  return (
    <div className='w-full border-r pr-2'>
      <div>
        <SidebarElement
          name='Dashboard'
          icon={LayoutDashboard}
          link={"dashboard"}
        />
        <hr className='w-[90%] mx-auto my-4 border-stone-300 dark:border-stone-600' />
      </div>
      <div>
        {/* <SidebarElement name='Tags' icon={Tag} link={'tag'} button={true} /> */}
        <TagAccordion />
        <hr className='w-[90%] mx-auto my-4 border-stone-300 dark:border-stone-600' />
      </div>
      <div className='w-40 space-y-1'>
        <SidebarElement name='Completed' icon={CheckCheck} link={"completed"} />
        <SidebarElement name='Trash' icon={Trash2} link={"trash"} />
      </div>
    </div>
  );
};

export default Sidebar;
