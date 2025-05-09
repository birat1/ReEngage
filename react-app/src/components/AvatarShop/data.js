import axios from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { backendAPI } from "../../constants";

export const fetchAvatars = async () => {
    const response = await axios.get(`${backendAPI}api/avatar`);
  
    return response.data;
}