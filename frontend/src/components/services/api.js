import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch navigation links
export const fetchNavLinks = async () => {
  try {
    const response = await apiClient.get("/nav-links");
    return response.data;
  } catch (error) {
    console.error("Error fetching navigation links:", error);
    throw error.response?.data || "Error fetching navigation links";
  }
};

