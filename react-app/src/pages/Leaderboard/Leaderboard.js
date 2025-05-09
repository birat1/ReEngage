import { Container } from "react-bootstrap";
import PodiumCard from "./PodiumCard.js";
import BoardEntry from "./BoardEntry.js";
import "./styles/Leaderboard.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CheckLoggedIn } from "../../components/Authentication/CheckLoginStatus.js";
import { backendAPI } from "../../constants.js";
import Spinner from "react-bootstrap/Spinner";

function Leaderboard() {
  return (
    <CheckLoggedIn>
      <div>
        <Content />
      </div>
    </CheckLoggedIn>
  );
}

const fetchStudents = async (subject, unit) => {
  const response = await axios.get(`${backendAPI}api/students/?sort_by=xp`);

  return response.data;
};

function Content() {
  const { data, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <section>
        <Container
          className="board-section gradient d-flex flex-column justify-content-center align-items-center pt-3"
          fluid
        >
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : (
            <>
              <span className="slide-up">
                <img
                  alt="ReEngage Logo"
                  src="logo.png"
                  width="50"
                  height="50"
                  className="logo"
                />
              </span>
              <h1
                className="fw-bolder slide-from-left"
                style={{ color: "#4b9cd3", fontFamily: "'Nunito', sans-serif" }}
              >
                ReEngage Leaderboard
              </h1>
              <div className="podium d-flex justify-content-center align-items-end gap-4 mt-3 mb-3">
                <div
                  className="slide-up"
                  style={{ animationDelay: `${2 * 0.3}s`, opacity: "0%" }}
                >
                  <PodiumCard
                    height={"22.5rem"}
                    width={"17.5rem"}
                    position={2}
                    colour={"#C4C4C4"}
                    name={data[1].firstname}
                    xp={data[1].xp}
                    user_id={data[1].user.id}
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
                    colour={"#efbf04"}
                    name={data[0].firstname}
                    xp={data[0].xp}
                    user_id={data[0].user.id}
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
                    colour={"#CE8946"}
                    name={data[2].firstname}
                    xp={data[2].xp}
                    user_id={data[2].user.id}
                  />
                </div>
              </div>
              <div className="board shadow rounded d-flex flex-column justify-content-center align-items-center gap-3 m-5 slide-up">
                {data.slice(3).map((student, index) => (
                  <div
                    className="fly-in"
                    style={{
                      animationDelay: `${(index + 1) * 0.1}s`,
                      opacity: "0%",
                      width: "100%",
                    }}
                    key={index}
                  >
                    <BoardEntry name={student.firstname} xp={student.xp} user_id={student.user.id}/>
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </div>
  );
}

export default Leaderboard;
