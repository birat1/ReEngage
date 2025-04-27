import axios from "axios";

export const fetchLessons = async (subject, unit) => {
  const response = await axios.get(
    `http://localhost:8000/api/oak/lessons/ks2/${subject}/${unit}`
  )

  return response.data;
};
