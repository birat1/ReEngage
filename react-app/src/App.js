import StarMathGame from "./Games/StarMathGame/StarMath-Game.js";
import StartGame from "./Games/Fill-itFish/MainGame.js";
import LabWars from "./Games/LabWars/LabWars.js";
import Home from "./pages/Home/Home.js";
import Games from "./pages/Games/Games.js";
import LoginRegister from "./pages/LoginRegister/LoginRegister.js";
import Navigationbar from "./components/Navbar/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navigationbar/>
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/starmath" element={<StarMathGame />} />
        <Route path="/fill-itfish" element={<StartGame />} />
        <Route path="/lab-wars" element={<LabWars />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
