import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllTags = async (setTags) => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/tag/getAllTags/${userId}`
      );
      if (res.status === 200) {
        setTags(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };
