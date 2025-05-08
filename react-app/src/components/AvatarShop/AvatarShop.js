import { useState } from "react";
import Shop from "./Shop.js";
import "./styles/AvatarShop.css";

function AvatarShop() {
  const [isShopOpen, setShopOpen] = useState(false);

  const toggleShop = () => {
    setShopOpen(!isShopOpen);
  };

  return (
    <div className="shop-container">
        <span onClick={toggleShop}>Avatar Customisation</span>

        {isShopOpen ? (
            <div className="pop-up-overlay">
              <Shop/>
            </div>
        ) : ("")}
    </div>
  );

}

export default AvatarShop;
