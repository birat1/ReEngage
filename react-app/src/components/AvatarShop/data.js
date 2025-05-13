import axios from "axios";
import { backendAPI } from "../../constants";

const csrfResponse = await axios.get(`${backendAPI}api/csrf/`, {
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
});

const csrfToken = csrfResponse.data.csrfToken;

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
