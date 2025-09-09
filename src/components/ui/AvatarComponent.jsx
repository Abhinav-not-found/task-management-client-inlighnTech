import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const AvatarComponent = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='cursor-pointer'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Button onClick={handleLogout} variant='ghost' className='w-full'>
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarComponent;
