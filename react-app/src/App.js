import StarMathGame from "./StarMathGame/StarMath-Game";
import GameContainer from "./StarMathGame/testing-game-container.js";
import StartGame from "./Games/Fill-itFish/MainGame.js";
import LabWars from "./Games/LabWars/LabWars.js"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/">
            <Route
              path="/starmath"
              /*element={
                <GameContainer>
                  <StarMathGame />
                </GameContainer>
              }*/
             element={<StarMathGame />}
            />
            <Route path="/fill-itfish" element={<StartGame />} />
            <Route path="/lab-wars" element={<LabWars />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
