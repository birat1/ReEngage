import { Container } from "react-bootstrap";
import UnitList from "./UnitList.js";
import "./Units.css";
import { CheckLoggedIn } from "../../../components/Authentication/CheckLoginStatus.js";

function Units() {
  return (
    <CheckLoggedIn>
      <div>
        <section>
          <Container
            className="units gradient d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "calc(100vh - 76px)" }}
            fluid
          >
            <UnitList />
          </Container>
        </section>
      </div>
    </CheckLoggedIn>
  );
}

export default Units;
