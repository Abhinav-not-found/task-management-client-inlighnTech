import { useNavigate } from "react-router-dom";

const SidebarElement = ({ name, icon: Icon, link }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${link}`)}
      className='w-full flex items-center justify-between cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 py-2 px-1.5 rounded-md'
    >
      <div className='flex items-center gap-2'>
        <Icon className='size-5 text-stone-500 dark:text-stone-400' />
        <p className='text-sm'>{name}</p>
      </div>
    </div>
  );
};

export default SidebarElement;
