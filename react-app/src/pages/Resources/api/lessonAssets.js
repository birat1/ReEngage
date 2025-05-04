import axios from "axios";

export const fetchVideo = async (lesson) => {
  const response = await axios.get(`http://localhost:8000/api/oak/lesson/assets/${lesson}/video/`, {
    responseType: "blob",
  });
  return URL.createObjectURL(response.data)
};

export const fetchWorksheet = async (lesson) => {
  const response = await axios.get(`http://localhost:8000/api/oak/lesson/assets/${lesson}/worksheet/`, {
    responseType: "blob",
  });
  
  const pdfBlob = new Blob([response.data], { type: "application/pdf" });

  return URL.createObjectURL(pdfBlob);
};
