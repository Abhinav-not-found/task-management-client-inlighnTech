import { Tag } from "lucide-react";

const TaskTagsSelector = ({ tags, selectedTags, setSelectedTags }) => {
  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const getTagColor = (color) => {
    switch (color) {
      case "red": return "text-red-500";
      case "green": return "text-green-500";
      case "blue": return "text-blue-500";
      case "yellow": return "text-yellow-500";
      case "purple": return "text-purple-500";
      default: return "text-gray-400";
    }
  };

  return (
    <div className='mt-4'>
      <label>Tags:</label>
      <div className='flex gap-2 flex-wrap mt-2'>
        {tags.map((tag) => (
          <button
            key={tag._id}
            type='button'
            onClick={() => toggleTag(tag._id)}
            className={`px-2 py-1 rounded-full cursor-pointer text-xs border ${
              selectedTags.includes(tag._id)
                ? "border-black bg-gray-900 text-white dark:border-white"
                : "border-gray-300"
            }`}
          >
            <Tag size={12} className={`inline mr-1 ${getTagColor(tag.color)}`} />
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskTagsSelector;
