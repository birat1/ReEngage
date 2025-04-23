import { Container } from "react-bootstrap";
import UnitList from "./UnitList.js";
import "./Units.css";


function Units() {
  return (
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
  );
}

export default Units;
