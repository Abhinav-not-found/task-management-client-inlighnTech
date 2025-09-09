import { Ellipsis, SquarePen, Tag as TagIcon, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

const colorClasses = {
  none: "text-gray-400",
  red: "text-red-500",
  green: "text-green-500",
  blue: "text-blue-500",
  yellow: "text-yellow-500",
  purple: "text-purple-500",
  all: "bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-transparent bg-clip-text",
};

const colors = [
  { name: "None", value: "none", class: "" },
  { name: "Red", value: "red", class: "bg-red-500" },
  { name: "Green", value: "green", class: "bg-green-500" },
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Yellow", value: "yellow", class: "bg-yellow-500" },
  { name: "Purple", value: "purple", class: "bg-purple-500" },
  {
    name: "All",
    value: "all",
    class: "bg-gradient-to-r from-red-500 via-green-500 to-blue-500",
  },
];

const TagElement = ({ tag, getAllTags }) => {
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);
  const [tagName, setTagName] = useState(tag.name);
  const [selectedColor, setSelectedColor] = useState(tag.color || "none");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    navigate(`/tag/${tag._id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/tag/delete/${tag._id}`
      );
      if (res.status === 200) {
        getAllTags();
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete tag");
    }
  };

  const handleEditSave = async () => {
    if (!tagName.trim()) return toast.error("Please enter a tag name");
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/tag/update/${tag._id}`, {
        name: tagName,
        color: selectedColor,
      });
      toast.success("Tag updated");
      getAllTags();
      setOpenEdit(false);
    } catch (err) {
      toast.error("Failed to update tag");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className='w-full flex items-center justify-between cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md py-2 px-1.5'
    >
      <div className='flex items-center gap-2'>
        <TagIcon
          className={`size-4 ${colorClasses[tag.color] || "text-gray-400"}`}
        />
        <p className='text-sm truncate capitalize max-w-[90px]'>{tag.name}</p>
      </div>

        <DropdownMenu>
          <DropdownMenuTrigger className='px-1 py-2 cursor-pointer'>
            <Ellipsis size={12} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogTrigger asChild>
                <Button
                  variant='ghost'
                  className='w-full hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-500 flex justify-start'
                  onClick={(e) => e.stopPropagation()}
                >
                  <SquarePen />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Tag</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder='Name'
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                />
                <div className='mt-4'>
                  <label className='block mb-1'>Color</label>
                  <div className='flex gap-2 flex-wrap'>
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedColor(color.value);
                        }}
                        className={`w-6 h-6 rounded-full border cursor-pointer ${
                          color.class
                        } ${
                          selectedColor === color.value
                            ? "border-black dark:border-white"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                <div className='flex gap-2 justify-end mt-4'>
                  <Button
                    variant='outline'
                    onClick={() => setOpenEdit(false)}
                    disabled={loading}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleEditSave}
                    disabled={loading || !tagName.trim()}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              variant='ghost'
              className='w-full hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 flex justify-start'
            >
              <Trash />
              Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};

export default TagElement;
