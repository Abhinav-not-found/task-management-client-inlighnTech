import axios from "axios";

export const getAllTags = async (setTags) => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.get(
        `http://localhost:3000/api/tag/getAllTags/${userId}`
      );
      if (res.status === 200) {
        setTags(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };
