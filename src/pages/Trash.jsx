import Layout from "../layout/layout";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TodoElement from "../components/task/TodoElement";
import TaskNotes from "../components/task/TaskNotes";
import { getMyTasks, deleteAllDeletedTasks } from "../helper/Task.helper";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import MobileView2 from "../components/mobileView/MobileView2";
import Header from "../components/general/Header";

const Trash = () => {
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    getMyTasks(setMyTasks);
  }, []);

  return (
    <Layout>
      <main className='w-full'>
        <div className='flex justify-between items-center pr-2 w-full'>
          <Header />

          <Button variant='' onClick={() => deleteAllDeletedTasks(setMyTasks)}>
            <Trash2 /> Delete All Trash
          </Button>
        </div>

        <div className='hidden md:block'>
          <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel minSize={28}>
              <div className='h-screen p-1'>
                {myTasks.filter((task) => task.isDeleted).length > 0 ? (
                  myTasks
                    .filter((task) => task.isDeleted)
                    .map((task) => (
                      <TodoElement
                        key={task._id}
                        data={task}
                        getMyTasks={() => getMyTasks(setMyTasks)}
                      />
                    ))
                ) : (
                  <p className='text-center text-muted-foreground'>
                    No trash tasks available
                  </p>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel minSize={28}>
              <TaskNotes getMyTasks={() => getMyTasks(setMyTasks)} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <MobileView2 />
      </main>
    </Layout>
  );
};

export default Trash;
