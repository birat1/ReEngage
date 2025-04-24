import { Container } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import LessonList from "./LessonList.js";
import { useState } from "react";
import "./styles/UnitLayout.css";

function UnitLayout() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleUnitList = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="unit-layout gradient d-flex">
      <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
        <LessonList />
      </div>
      <div className={`lesson-content d-flex flex-column align-items-center ${isExpanded ? "with-sidebar" : ""}`}>
        <div className="icon-holder">
        <div className={`hamburger ${isExpanded ? "change" : ""}`} onClick={toggleUnitList}>
          <div class="bar1 rounded"> </div>
          <div class="bar2 rounded"> </div>
          <div class="bar3 rounded"> </div>
        </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default UnitLayout;
