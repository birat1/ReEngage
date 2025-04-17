import "./styles/BoardEntry.css";

function BoardEntry({name, points}) {
  return (
    <div className="entry d-flex align-items-center justify-content-between gap-3 rounded">
      <div className="d-flex align-items-center gap-4">
        <div
          className="avatar-frame rounded overflow-hidden ms-2"
          style={{ height: "3.5rem", width: "3.5rem", borderWidth: "1px" }}
        >
          <img
            alt="Avatar"
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXVhNXppajI5M2J0eWRzd3hmN3o0eWR0cHNjNHQyYWprMnhrczNjeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gJzHT5BZZuQYbmw/giphy.gif"
            className="avatar"
          />
        </div>
        <h4 className="mb-0">Student Name</h4>
      </div>
      <h5 className="mb-0">0000 Points</h5>
    </div>
  );
}

export default BoardEntry;
