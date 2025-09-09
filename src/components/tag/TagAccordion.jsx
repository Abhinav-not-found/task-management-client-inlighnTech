import { useState, useEffect } from "react";
import AddTagComponent from "../tag/AddTagComponent";
import { ChevronDown, ChevronRight } from "lucide-react";
import axios from "axios";
import TagElement from "./TagElement";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TagAccordion = () => {
  const [active, setActive] = useState(false);
  const [tags, setTags] = useState([]);

  const handleAccordionClick = () => setActive(!active);

  const getAllTags = async () => {
    const userId = localStorage.getItem("userId");  
    try {
      const res = await axios.get(
        `${API_BASE_URL}:3000/api/tag/getAllTags/${userId}`
      );
      if (res.status === 200) {
        setTags(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const handleTagAdded = (newTag) => {
    setTags((prev) => [...prev, newTag]);
  };

  return (
    <div className='w-full'>
      <div
        onClick={handleAccordionClick}
        className='w-full flex items-center justify-between cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 py-2 px-1.5 rounded-md'
      >
        <div className='flex gap-2 items-center'>
          {active ? (
            <ChevronDown className='size-5 text-muted-foreground' />
          ) : (
            <ChevronRight className='size-5 text-muted-foreground' />
          )}
          <p className='text-sm select-none'>Tags</p>
        </div>

        <AddTagComponent onTagAdded={handleTagAdded} getAllTags={getAllTags} />
      </div>

      {active && (
        <div
          className={`w-full py-2 px-1 rounded-md ${
            tags.length === 0 ? "bg-stone-50 dark:bg-stone-900" : ""
          }`}
        >
          {tags.length === 0 ? (
            <p className='text-xs w-[12em] text-muted-foreground whitespace-normal break-words select-none'>
              Categorize your task with tags.
            </p>
          ) : (
            <div className='h-fit flex flex-col'>
              {tags.map((tag) => (
                <TagElement key={tag._id} tag={tag} getAllTags={getAllTags} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagAccordion;
