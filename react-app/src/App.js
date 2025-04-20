import StarMathGame from "./Games/StarMathGame/StarMath-Game.js";
import StartGame from "./Games/Fill-itFish/MainGame.js";
import LabWars from "./Games/LabWars/LabWars.js";
import Home from "./pages/Home/Home.js";
import Games from "./pages/Games/Games.js";
import Leaderboard from "./pages/Leaderboard/Leaderboard.js";
import Resources from "./pages/Resources/Resources.js";
import Subjects from "./pages/Resources/Subjects/Subjects.js";
import LoginRegister from "./pages/LoginRegister/LoginRegister.js";
import Navigationbar from "./components/Navbar/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimalFact from "./components/AnimalFacts/AnimalFact.js";

function App() {
  return (
    <BrowserRouter>
      <Navigationbar/>
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:year" element={<Subjects />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/starmath" element={<StarMathGame />} />
        <Route path="/fill-itfish" element={<StartGame />} />
        <Route path="/lab-wars" element={<LabWars />} />
        {/* testing */}
        <Route path="/funfact" element={<AnimalFact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
