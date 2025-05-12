import React from "react";
import StarMathGame from "./Games/StarMathGame/StarMath-Game.js";
import StartGame from "./Games/Fill-itFish/MainGame.js";
import LabWars from "./Games/LabWars/LabWars.js";
import Home from "./pages/Home/Home.js";
import Games from "./pages/Games/Games.js";
import Leaderboard from "./pages/Leaderboard/Leaderboard.js";
import Resources from "./pages/Resources/Resources.js";
import Subjects from "./pages/Resources/Subjects/Subjects.js";
import Units from "./pages/Resources/Units/Units.js";
import UnitLayout from "./pages/Resources/Unit/UnitLayout.js";
import Lesson from "./pages/Resources/Unit/Lesson.js";
import LoginRegister from "./pages/LoginRegister/LoginRegister.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentProgress from "./pages/StudentProgress/StudentProgress.js";
import ChildRegister from "./pages/ChildRegister/ChildRegister.js";
import ForbiddenPage403 from "./pages/Forbidden/forbidden.js";
import Dashboard from "./pages/Dashboard/dashboard.js";
import ResetPassword from "./pages/Dashboard/components/ResetPasswordPage.js";
import Contact from "./pages/Contact/Contact.js";
import Layout from "./components/Layout.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/games" element={<Games />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:year" element={<Subjects />} />
          <Route path="/resources/:year/:subject" element={<Units />} />
          <Route path="/resources/:year/:subject/:unit" element={<UnitLayout />}>
            <Route path=":lesson" element={<Lesson />} />
          </Route>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/games/starmath" element={<StarMathGame />} />
          <Route path="/games/fill-itfish" element={<StartGame />} />
          <Route path="/games/labwars" element={<LabWars />} />
          <Route path="/student-progress" element={<StudentProgress />} />
          <Route path="/child-register" element={<ChildRegister />} />
          <Route path="/403" element={<ForbiddenPage403 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
