import Footer from "../../components/Footer/Footer.js";
import { Container } from "react-bootstrap";
import PodiumCard from "./PodiumCard.js";
import BoardEntry from "./BoardEntry.js";
import "./styles/Leaderboard.css";

function Leaderboard() {
  return (
    <div>
      <Content />
      <Footer />
    </div>
  );
}

const students = [];

for (let i = 1; i <= 17; i++) {
  students.push({
    student: "Student Name",
    points: "0000",
  });
}

function Content() {
  return (
    <div>
      <section>
        <Container
          className="board-section d-flex flex-column justify-content-center align-items-center"
          fluid
        >
          <h1 className="fw-bolder slide-from-left mt-5">Leaderboard</h1>
          <div className="podium d-flex justify-content-center align-items-end gap-4 mt-3 mb-3">
            <div
              className="slide-up"
              style={{ animationDelay: `${2 * 0.3}s`, opacity: "0%" }}
            >
              <PodiumCard
                height={"22.5rem"}
                width={"17.5rem"}
                position={2}
                colour={"#f2f2f2"}
              />
            </div>
            <div
              className="slide-up"
              style={{ animationDelay: `${1 * 0.3}s`, opacity: "0%" }}
            >
              <PodiumCard
                height={"25rem"}
                width={"20rem"}
                position={1}
                colour={"#f2f2f2"}
              />
            </div>
            <div
              className="slide-up"
              style={{ animationDelay: `${3 * 0.3}s`, opacity: "0%" }}
            >
              <PodiumCard
                height={"22.5rem"}
                width={"17.5rem"}
                position={3}
                colour={"#f2f2f2"}
              />
            </div>
          </div>
          <div
            className="board shadow rounded d-flex flex-column justify-content-center align-items-center gap-3 m-5"
            style={{ minHeight: "40rem" }}
          >
            {students.map((student, index) => (
              <div
                className="fly-in"
                style={{ animationDelay: `${(index+1) * 0.1}s`, opacity: "0%" }}
                key={index}
              >
                <BoardEntry name={student.name} points={student.points} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Leaderboard;
