import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { backendAPI } from "../../constants";
import One from "../../avatars/One.png";
import Two from "../../avatars/Two.png";
import Three from "../../avatars/Three.png";
import Four from "../../avatars/Four.png";
import Five from "../../avatars/Five.png";
import Six from "../../avatars/Six.png";
import Seven from "../../avatars/Seven.png";
import Eight from "../../avatars/Eight.png";
import Nine from "../../avatars/Nine.png";
import Ten from "../../avatars/Ten.png";
import Eleven from "../../avatars/Eleven.png";
import Twelve from "../../avatars/Twelve.png";
import Thirteen from "../../avatars/Thirteen.png";
import Fourteen from "../../avatars/Fourteen.png";
import Fifteen from "../../avatars/Fifteen.png";
import Sixteen from "../../avatars/Sixteen.png";
import Default from "../../avatars/Default.png";

// avatar mapping
const avatarImages = {
  One: One,
  Two: Two,
  Three: Three,
  Four: Four,
  Five: Five,
  Six: Six,
  Seven: Seven,
  Eight: Eight,
  Nine: Nine,
  Ten: Ten,
  Eleven: Eleven,
  Twelve: Twelve,
  Thirteen: Thirteen,
  Fourteen: Fourteen,
  Fifteen: Fifteen,
  Sixteen: Sixteen,
  Default: Default,
};

export function useAnyEquippedAvatar(user_Id) {
  const { data: avatarData } = useQuery({
    queryKey: ["EquippedAvatar", user_Id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${backendAPI}api/current-equipped-avatar/${user_Id}/`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        console.error("Avatar fetch failed:", error);
        throw new Error("Failed to fetch avatar info");
      }
    },
    onError: (error) => console.error("Avatar query failed:", error),
    onSuccess: (data) => console.log("Avatar data loaded:", data),
  });

  if (!avatarData) return undefined;

  const avatarName = avatarData?.name || "Default";
  return avatarImages[avatarName] || Default;
}
