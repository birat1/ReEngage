import "./styles/BoardEntry.css";
import { useAnyEquippedAvatar } from "../../components/RetrievingAvatars/AnyEquippedAvatar";

function BoardEntry({name, xp, user_id, level}) {
  return (
    <div className="entry shadow-sm d-flex align-items-center justify-content-between gap-3 rounded">
      <div className="d-flex align-items-center gap-4">
        <div
          className="avatar-frame rounded overflow-hidden ms-2"
          style={{ height: "3.5rem", width: "3.5rem", borderWidth: "1px" }}
        >
          <img
            alt="Avatar"
            src={useAnyEquippedAvatar(user_id)}
            className="avatar1"
          />
        </div>
        <h4 className="mb-0">{name}</h4>
      </div>
      <div>
        <h5 className="mb-0">Level {level}</h5>
        <h5 className="mb-0">{xp} XP</h5>
      </div>
    </div>
  );
}

export default BoardEntry;
