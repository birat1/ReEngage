import StarMathGame from "./StarMathGame/StarMath-Game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/">
            <Route path="/starmath" element={<StarMathGame />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
