import Layout from "../layout/layout";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CreateTaskComponent from "../components/task/CreateTaskComponent";
import TaskNotes from "../components/task/TaskNotes";
import { getMyTasks } from "../helper/Task.helper";
import { getAllTags } from "../helper/Tag.helper";
import MobileView1 from "../components/mobileView/MobileView1";
import Pending from "../components/dashboard/Pending";
import Today from "../components/dashboard/Today";
import Upcoming from "../components/dashboard/Upcoming";
import Header from "../components/general/Header";

const Dashboard = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getMyTasks(setMyTasks);
    getAllTags(setTags);
  }, []);

  return (
    <Layout>
      <main className='w-full'>
        <div className='flex justify-between items-center pr-2 pb-4 md:pb-0 w-full'>
          <Header />
          <CreateTaskComponent
            tags={tags}
            refreshTags={() => getAllTags(setTags)}
            getMyTasks={() => getMyTasks(setMyTasks)}
          />
        </div>

        <div className='hidden md:block'>
          <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel minSize={28}>
              <div className='h-screen p-1 '>
                <Pending myTasks={myTasks} setMyTasks={setMyTasks} />
                <Today myTasks={myTasks} setMyTasks={setMyTasks} />
                <Upcoming myTasks={myTasks} setMyTasks={setMyTasks} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel minSize={28}>
              <TaskNotes getMyTasks={() => getMyTasks(setMyTasks)} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <MobileView1 />
      </main>
    </Layout>
  );
};

export default Dashboard;
