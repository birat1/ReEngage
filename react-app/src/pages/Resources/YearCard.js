import { Link } from "react-router";
import "./styles/YearCard.css";

function YearCard({ year }) {
  return (
    <Link to={`/resources/${year}`} style={{ textDecoration: 'none' }}>
      <div className="year-card game-card-animate rounded shadow-sm d-flex flex-column justify-content-center align-items-center">
        <h1>Year</h1>
        <h1>{year}</h1>
      </div>
    </Link>
  );
}

export default YearCard;
