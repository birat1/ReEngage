import { useState, useRef, useEffect } from "react";
import Shop from "./Shop.js";
import "./styles/AvatarShop.css";

function AvatarShop() {
  const [isShopOpen, setShopOpen] = useState(false);
  const shopRef = useRef(null);
  
  // Handle clicks outside the shop panel
  useEffect(() => {
    function handleClickOutside(event) {
      // Close shop if click is outside the shop panel
      if (shopRef.current && !shopRef.current.contains(event.target)) {
        setShopOpen(false);
      }
    }
    
    // Add event listener when shop is open
    if (isShopOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShopOpen]);

  const toggleShop = () => {
    setShopOpen(!isShopOpen);
  };

  return (
    <div className="shop-container">
        <span onClick={toggleShop}>Avatar Customisation</span>

        {isShopOpen ? (
            <div className="pop-up-overlay">
              <div ref={shopRef}>
                <Shop/>
              </div>
            </div>
        ) : ("")}
    </div>
  );
}

export default AvatarShop;
