import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const AddTagComponent = ({ getAllTags }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  const handleColorClick = (e, color) => {
    e.stopPropagation();
    setSelectedColor(color.value);
  };

  const handleSave = async () => {
    if (!tagName.trim()) return toast.error("Please enter a tag name");
    setLoading(true);
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post("http://localhost:3000/api/tag/create", {
        name: tagName,
        color: selectedColor || "none",
        userId: userId,
      });
      if (res.status === 201) {
        setTagName("");
        setSelectedColor("");
        toast.success("Tag created successfully");
        getAllTags();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create tag");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='mr-0 cursor-pointer text-muted-foreground hover:text-black p-1 rounded'>
          <Plus className='size-4' />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tag</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder='Name'
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />

          <div className='mt-4'>
            <label className='block mb-1'>Color</label>
            <div className='flex gap-2 flex-wrap'>
              {colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleColorClick(e, color)}
                  className={`w-6 h-6 rounded-full border cursor-pointer ${
                    selectedColor === color.value
                      ? "border-black dark:border-white"
                      : "border-gray-300 dark:border-gray-600"
                  } ${
                    color.value === "all"
                      ? "bg-gradient-to-r from-red-500 via-green-500 to-blue-500"
                      : color.value !== "none"
                      ? `bg-${color.value}-500`
                      : ""
                  }`}
                  title={color.name}
                ></button>
              ))}
            </div>
          </div>

          <div className='flex gap-2 justify-end mt-4'>
            <Button variant={"outline"} onClick={() => onClose?.()}>
              Close
            </Button>
            <Button onClick={handleSave} disabled={loading || !tagName.trim()}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTagComponent;
