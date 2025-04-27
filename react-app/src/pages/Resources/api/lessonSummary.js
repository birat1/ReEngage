import axios from "axios";

export const fetchSummary = async (lesson) => {
    const response = await axios.get(`http://localhost:8000/api/oak/lesson/${lesson}/summary/`)
    return response.data;
  };
  