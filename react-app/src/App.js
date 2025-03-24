import StarMathGame from "./StarMathGame/StarMath-Game";
import StartGame from "./Fill-itFish/MainGame.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/">
            <Route path="/starmath" element={<StarMathGame />} />
            <Route path="/fill-itfish" element={<StartGame />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
