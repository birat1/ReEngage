import { Backpack, Store } from "lucide-react";
import "./styles/Shop.css";
import { useState } from "react";
import AvatarCard from "./AvatarCard";

function Shop() {
  const [activeTab, setActiveTab] = useState("shop");

  return (
    <div className="customise-container rounded p-3 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="bold">Avatar Customisation</h4>
        <div>Points</div>
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
                <AvatarCard/>
                <AvatarCard/>
                <AvatarCard/>
                <AvatarCard/>
                <AvatarCard/>
                <AvatarCard/>
                <AvatarCard/>
            </div>
        ) : (
            <div className="tab mt-3 pb-1 mx-auto">
                <AvatarCard/>
                <AvatarCard/>
                <AvatarCard/>
            </div>
        )}
    </div>
  );
}

export default Shop;
