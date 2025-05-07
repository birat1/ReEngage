import Crown from "./images/Crown.png";
import First from "./images/First-Medal.png";
import Second from "./images/Second-Medal.png";
import Third from "./images/Third-Medal.png";
import "./styles/PodiumCard.css";
import { useAnyEquippedAvatar } from "../../components/RetrievingAvatars/AnyEquippedAvatar";

function Medal ({position}) {
    if (position === 1) {
        return <img alt="Medal" src={First} className="medal"/>;
    } else if (position === 2) {
        return <img alt="Medal" src={Second} className="medal"/>;
    } else {
        return <img alt="Medal" src={Third} className="medal"/>;
    }
}

function PodiumCard({height, width, position, colour, name, xp, user_id}) {
  return (
    <div className="podium-card shadow rounded p-3 d-flex flex-column align-items-center gap-3" style={{ height: height, width: width, borderColor: colour }}>
      <div className="d-flex flex-column align-items-center">
        {position === 1 && <img src={Crown} className="crown" alt="Crown" />}
        <div className="avatar-frame rounded overflow-hidden" style={{ height: "6rem", width: "6rem" }}>
          <img
            alt="Avatar"
            src={useAnyEquippedAvatar(user_id)}
            className="avatar1"
          />
        </div>
      </div>
      <h3 className="text-center">{name}</h3>
      <h5 className="text-center">{xp} XP</h5>
      <Medal position = {position}/>
    </div>
  );
}

export default PodiumCard;
