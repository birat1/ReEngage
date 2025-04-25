import axios from "axios";

export const fetchUnits = async (subject,year) => {


  const response = await axios.get(`http://localhost:8000/api/oak/units/ks2/${subject}/${year}/`)
    
  console.log("API Response:", response.data); 
  return response.data;

};
