import axios from "axios";

export const fetchVideo = async (lesson) => {
  const response = await axios.get(`http://localhost:8000/api/oak/lesson/assets/${lesson}/video/`, {
    responseType: "blob", // Specify that we're expecting binary data (video)
  });
  return URL.createObjectURL(response.data)
};

export const fetchWorksheet = async (lesson) => {
  const response = await axios.get(`http://localhost:8000/api/oak/lesson/assets/${lesson}/worksheet/`, {
    responseType: "blob", // Specify that we're expecting binary data (video)
  });
  
  const pdfBlob = new Blob([response.data], { type: "application/pdf" });

  return URL.createObjectURL(pdfBlob);
};
