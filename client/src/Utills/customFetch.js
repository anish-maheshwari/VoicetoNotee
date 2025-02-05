import axios from "axios";

export const customFetch = axios.create({
  // baseURL: "http://localhost:5100/api/v1", // Update based on your backend
  baseURL: "https://voicetonotee.onrender.com", // Update based on your backend

  withCredentials: true, // Important: Ensures cookies are sent
  headers: {
    "Content-Type": "application/json",
  },
});
