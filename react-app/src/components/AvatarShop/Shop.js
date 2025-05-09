import { Backpack, Store } from "lucide-react";
import "./styles/Shop.css";
import { useState } from "react";
import { AvatarCardShop, AvatarCardInventory } from "./AvatarCard.js";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../Authentication/CheckLoginStatus";
import { fetchAvatars } from "./data";

function Shop() {
  const [activeTab, setActiveTab] = useState("shop");

  const {
    data: userInfo,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    refetchOnWindowFocus: false,
  });

  const {
    data: avatars,
    isLoading: avatarsLoading,
    error: avatarError,
  } = useQuery({
    queryKey: ["avatars"],
    queryFn: fetchAvatars,
    refetchOnWindowFocus: false,
  });

  if (userLoading || avatarsLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="customise-container rounded p-3 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="bold">Avatar Customisation</h4>
        <div className="points rounded">{userInfo.points} Points</div>
      </div>

      <div className="d-flex justify-content-evenly mt-2">
        <div
          className={`tab-button rounded ${
            activeTab === "shop" ? "current" : ""
          }`}
          onClick={() => setActiveTab("shop")}
        >
          <Store className="tab-icon" strokeWidth={1.5} />
          <h5>Shop</h5>
        </div>
        <div
          className={`tab-button rounded ${
            activeTab === "inventory" ? "current" : ""
          }`}
          onClick={() => setActiveTab("inventory")}
        >
          <Backpack className="tab-icon" strokeWidth={1.5} />
          <h5>Inventory</h5>
        </div>
      </div>

      {activeTab === "shop" ? (
        <div className="tab mt-3 pb-1 mx-auto">
          {avatars?.filter((avatar) => !userInfo.owned_avatars.some((owned) => owned.avatar_id === avatar.avatar_id))
            .map((avatar, index) => (
              <div key={index}>
                <AvatarCardShop name={avatar.name} price={avatar.price} />
              </div>
            ))}
        </div>
      ) : (
        <div className="tab mt-3 pb-1 mx-auto">
            <AvatarCardInventory name={"Default"}/>
          {userInfo.owned_avatars.map((avatar, index) => (
            <div key={index}>
              <AvatarCardInventory
                name={avatar.name}
                isEquipped={avatar.is_equipped}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
