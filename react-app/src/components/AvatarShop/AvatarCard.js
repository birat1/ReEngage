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

function AvatarCardShop({ name, price, isBuying, onBuy }) {
  return (
    <div className="avatar-card rounded shadow-sm d-flex flex-column align-items-center gap-1 p-3">
      <div className="avatar-card-image rounded overflow-hidden">
        <img alt="Avatar" src={avatarImages[name]} className="img-cover" />
      </div>
      <h4>{name}</h4>
      {name !== "Default" ? (
        <>
          <span>{price} Points</span>
          <button
            className="buy-btn rounded mt-3"
            onClick={onBuy}
            disabled={isBuying}
            aria-busy={isBuying}
          >
            {isBuying ? "Buying…" : "Buy"}
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

function AvatarCardInventory({ name, isEquipped, isEquipping, onEquip }) {
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
        <button
          className="equip-btn rounded"
          onClick={onEquip}
          disabled={isEquipping}
        >
          {isEquipping ? 'Equipping...' : 'Equip'}
        </button>
      )}
    </div>
  );
}

export { AvatarCardShop, AvatarCardInventory };
