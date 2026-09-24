import axios from "axios";
import { backendAPI } from "../../constants";

export const fetchAvatars = async () => {
  const response = await axios.get(`${backendAPI}api/avatar`);
  return response.data;
};

const getCsrfToken = async () => {
  const response = await axios.get(`${backendAPI}api/csrf/`, {
    withCredentials: true,
  });
  return response.data.csrfToken;
};

export const purchaseAvatar = async (avatarId) => {
  const csrfToken = await getCsrfToken();
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
  const csrfToken = await getCsrfToken();
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
