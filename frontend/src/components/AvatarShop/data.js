import axios from "axios";
import { backendAPI } from "../../constants";

// Initialize csrfToken variable
let csrfToken = '';

// Function to fetch CSRF token
const fetchCsrfToken = async () => {
  try {
    const csrfResponse = await fetch(`${backendAPI}api/csrf/`, {
      credentials: "include",
      mode: "cors",
    });
    const csrfData = await csrfResponse.json();
    csrfToken = csrfData.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return '';
  }
};

// Initialize token when module is imported
fetchCsrfToken();

export const fetchAvatars = async () => {
  const response = await axios.get(`${backendAPI}api/avatar`);
  return response.data;
};

export const purchaseAvatar = async (avatarId) => {
  // If token wasn't set yet, fetch it
  if (!csrfToken) {
    await fetchCsrfToken();
  }
  
  const response = await axios.post(
    `${backendAPI}api/purchase-avatar/`,
    { avatar_id: avatarId },
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );
  return response.data;
};

export const equipAvatar = async (avatarId) => {
  // If token wasn't set yet, fetch it
  if (!csrfToken) {
    await fetchCsrfToken();
  }
  
  const response = await axios.post(
    `${backendAPI}api/equip-avatar/`,
    { avatar_id: avatarId },
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );
  return response.data;
}; 