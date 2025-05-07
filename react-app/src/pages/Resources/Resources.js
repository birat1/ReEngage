import Footer from "../../components/Footer/Footer";
import YearCard from "./YearCard.js";
import Container from "react-bootstrap/Container";
import "./styles/Resources.css";
import { CheckLoggedIn } from "../../components/Authentication/CheckLoginStatus.js";

function Resources() {
  return (
    <CheckLoggedIn>
      <div>
        <section>
          <Container
            className="years gradient d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "calc(100vh - 76px)" }}
            fluid
          >
            <div className="year-cards d-flex justify-content-center align-items-center gap-4">
              <div className="slide-up" style={{ opacity: "0%" }}>
                <YearCard year={3} />
              </div>
              <div
                className="slide-up"
                style={{ animationDelay: ".1s ", opacity: "0" }}
              >
                <YearCard year={4} />
              </div>
              <div
                className="slide-up"
                style={{ animationDelay: ".2s ", opacity: "0" }}
              >
                <YearCard year={5} />
              </div>
              <div
                className="slide-up"
                style={{ animationDelay: ".3s ", opacity: "0" }}
              >
                <YearCard year={6} />
              </div>
            </div>
          </Container>
        </section>
      </div>
    </CheckLoggedIn>
  );
}

export default Resources;
