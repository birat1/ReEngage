import "./styles/AvatarCard.css";

function AvatarCard() {
  return (
    <div className=" avatar-card rounded shadow-sm d-flex flex-column align-items-center gap-1 p-3">
      <div className="avatar-card-image rounded overflow-hidden">
        <img
          alt="Avatar"
          src="https://media2.giphy.com/media/26gJzHT5BZZuQYbmw/giphy.gif?cid=6c09b952nze53vb41otothgi252ebiwwayt3fpjmob5kwdn4&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"
          className="img-cover"
        />
      </div>
      <h4>Avatar</h4>
      <span>Points</span>
      <div>
        Buy
      </div>
    </div>
  );
}

export default AvatarCard;
