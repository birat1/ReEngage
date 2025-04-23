import { Container } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import LessonList from "./LessonList.js";
import "./styles/UnitLayout.css";

function UnitLayout() {

  return (
    <div>
      <section>
        <Container
          className="unit-layout gradient d-flex align-items-center gap-5"
          style={{ minHeight: "50rem" }}
          fluid
        >
          <div className="lesson-list-section d-flex flex-column justify-content-center">
            <LessonList />
          </div>
          <div className="lesson-section d-flex flex-column justify-content-center">
            <Outlet />
          </div>
        </Container>
      </section>
    </div>
  );
}

export default UnitLayout;
