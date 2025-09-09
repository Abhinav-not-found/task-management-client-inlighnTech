import Navbar from "../components/general/Navbar";
import Sidebar from "../components/general/Sidebar";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='flex gap-4'>
        <div className='hidden md:block h-screen p-2'>
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
