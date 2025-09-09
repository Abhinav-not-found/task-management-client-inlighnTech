import Layout from "../../layout/layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TodoElement from "../task/TodoElement";
import TaskNotes from "../task/TaskNotes";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MobileView4 from "../mobileView/MobileView4";

const TagComponent = () => {
  const { id } = useParams(); 
  const [tagTasks, setTagTasks] = useState([]);
  const [tagInfo, setTagInfo] = useState(null);

  const getTasksByTag = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.get(
        `http://localhost:3000/api/tag/getTasksByTag/${id}?userId=${userId}`
      );
      if (res.status === 200) {
        setTagTasks(res.data.tasks);
        setTagInfo(res.data.tag);
      }
    } catch (error) {
      console.error("Error fetching tasks by tag:", error);
    }
  };

  useEffect(() => {
    getTasksByTag();
  }, [id]);

  return (
    <Layout>
      <div className="w-full">
        <div className="flex justify-between items-center pr-2 w-full">
          <div className="border px-4 py-2 w-fit rounded-md">
            <p className="font-semibold capitalize">
              {tagInfo ? tagInfo.name : "Loading..."}
            </p>
            {/* <p className="text-muted-foreground text-xs">
              Tagged tasks overview
            </p> */}
          </div>
        </div>

      <div className="hidden md:block">

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={28}>
            <div className="h-screen p-1">
              {tagTasks.length > 0 ? (
                tagTasks
                  .filter((task) => !task.isDeleted)
                  .map((task) => (
                    <TodoElement
                      key={task._id}
                      data={task}
                      getMyTasks={getTasksByTag}
                    />
                  ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No tasks available for this tag
                </p>
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={28}>
            <TaskNotes getMyTasks={getTasksByTag} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <MobileView4/>

      </div>
    </Layout>
  );
};

export default TagComponent;
