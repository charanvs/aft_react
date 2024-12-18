import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: "http://aftpb.org/aft_react_backend/public/api", // Laravel API base URL
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

