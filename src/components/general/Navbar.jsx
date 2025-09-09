import { Link } from "react-router-dom";
import AvatarComponent from "../ui/AvatarComponent";
import { ModeToggle } from "../ui/mode-toggle";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logoDark.png";
import { useTheme } from "@/components/ui/theme-provider";
import SidebarSheet from "./SidebarSheet";


const Navbar = () => {
  const { theme } = useTheme();

  return (
    <nav className='h-14 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        
        <SidebarSheet/>
        <Link to='/dashboard' className='font-semibold flex gap-1'>
          <img
            src={theme === "dark" ? logoDark : logo}
            className='size-5'
            alt='logo'
          />
          Propella
        </Link>
      </div>

      <div className='flex gap-4'>
        <ModeToggle />
        <AvatarComponent />
      </div>
    </nav>
  );
};

export default Navbar;
