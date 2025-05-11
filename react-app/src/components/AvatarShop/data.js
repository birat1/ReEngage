import axios from "axios";
import { backendAPI } from "../../constants";

const csrfResponse = await fetch(`${backendAPI}api/csrf/`, {
  credentials: "include",
  mode: "cors",
});

const csrfData = await csrfResponse.json();
const csrfToken = csrfData.csrfToken;

export const fetchAvatars = async () => {
  const response = await axios.get(`${backendAPI}api/avatar`);
  return response.data;
};

export const purchaseAvatar = async (avatarId) => {
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
  const response = await axios.patch(
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
