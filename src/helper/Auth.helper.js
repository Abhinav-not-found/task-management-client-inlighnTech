import axios from "axios";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handleLogin = async (email, password, navigate) => {
  if (!email || !password) {
    toast.error("Please fill all fields");
    return;
  }
  console.log('API_BASE_URL:', API_BASE_URL);
  try {
    const res = await axios.post(`${API_BASE_URL}/api/user/login`, {
      email,
      password,
    });
    if (res.status === 200) {
      toast.success(res.data.message || "Login successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);
      navigate("/dashboard");
    }
  } catch (error) {
    const data = error.response?.data;
    
    if (data?.type === "USER_NOT_FOUND") {
      toast.error("User not found");
    } else if (data?.type === "INVALID_CREDENTIALS") {
      toast.error("Invalid password");
    } else if (data?.type === "MISSING_FIELDS") {
      toast.error("Please fill all fields");
    } else {
      toast.error(data?.message || "Something went wrong");
    }
  }
};




export const handleRegister = async (username, email, password, navigate) => {
  if (!username || !email || !password) {
    toast.error("Please fill all fields");
    return;
  }
  try {
    const res = await axios.post(`${API_BASE_URL}/api/user/register`, {
      username,
      email,
      password,
    });
    if (res.status === 201) {
      toast.success(res.data.message || "Registration successful");
      navigate("/login");
    }
  } catch (error) {
    const data = error.response?.data;

    if (data?.type === "USERNAME_EXISTS") {
      toast.error("Username already exists");
    } else if (data?.type === "EMAIL_EXISTS") {
      toast.error("Email already exists");
    } else if (data?.type === "MISSING_FIELDS") {
      toast.error("Please fill all fields");
    } else {
      toast.error(data?.message || "Something went wrong");
    }
  }
};
