import "./styles/AvatarCard.css";
import One from "../../avatars/One.png";
import Two from "../../avatars/Two.png";
import Three from "../../avatars/Three.png";
import Four from "../../avatars/Four.png";
import Five from "../../avatars/Five.png";
import Six from "../../avatars/Six.png";
import Default from "../../avatars/Default.png";

const avatarImages = {
  One: One,
  Two: Two,
  Three: Three,
  Four: Four,
  Five: Five,
  Six: Six,
  Default: Default,
};

function AvatarCardShop({ name, price }) {
  return (
    <div className="avatar-card rounded shadow-sm d-flex flex-column align-items-center gap-1 p-3">
      <div className="avatar-card-image rounded overflow-hidden">
        <img alt="Avatar" src={avatarImages[name]} className="img-cover" />
      </div>
      <h4>{name}</h4>
      {name !== "Default" ? (
        <>
          <span>{price} Points</span>
          <div className="buy-btn rounded mt-3">Buy</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

function AvatarCardInventory({ name, isEquipped }) {
  return (
    <div
      className={`avatar-card rounded shadow-sm d-flex flex-column align-items-center gap-1 p-3 ${
        isEquipped ? "equipped-card" : ""
      }`}
    >
      <div className="avatar-card-image rounded overflow-hidden">
        <img alt="Avatar" src={avatarImages[name]} className="img-cover" />
      </div>
      <h4>{name}</h4>
      {isEquipped ? (
        <div className="equipped-btn rounded">Equipped</div>
      ) : (
        <div className="equip-btn rounded">Equip</div>
      )}
    </div>
  );
}

export { AvatarCardShop, AvatarCardInventory };
