import axios from "axios";
import { backendAPI } from "../../constants.js";

export const fetchUnits = async (subject,year) => {
  const response = await axios.get(`${backendAPI}api/oak/units/ks2/${subject}/${year}/`)
  return response.data;

};

export const fetchLessons = async (subject, unit) => {
    const response = await axios.get(
      `${backendAPI}api/oak/lessons/ks2/${subject}/${unit}`
    )
  
    return response.data;
  };
  
export const fetchSummary = async (lesson) => {
    const response = await axios.get(`${backendAPI}api/oak/lesson/${lesson}/summary/`)
    return response.data;
  };

export const fetchVideo = async (lesson) => {
    const response = await axios.get(`${backendAPI}api/oak/lesson/assets/${lesson}/video/`, {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data)
  };
  
export const fetchWorksheet = async (lesson) => {
    const response = await axios.get(`${backendAPI}api/oak/lesson/assets/${lesson}/worksheet/`, {
      responseType: "blob",
    });
    
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
  
    return URL.createObjectURL(pdfBlob);
  };