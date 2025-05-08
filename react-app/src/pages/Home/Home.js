import Footer from "../../components/Footer/Footer.js";
import Hero from "./Hero/Hero.js";
import Dashboard from "../Dashboard/dashboard.js";
import {
  CheckLoggedIn,
  useAuthStatus,
} from "../../components/Authentication/CheckLoginStatus.js";
import { Spinner } from "react-bootstrap";

function Home() {
  const { isLoggedIn, isLoading } = useAuthStatus();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "calc(100vh - 76px)" }}
      >
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <>
        <CheckLoggedIn>
          <Dashboard />
        </CheckLoggedIn>
      </>
    );
  } else {
    return (
      <>
        <Hero />
        <Footer />
      </>
    );
  }
}

export default Home;
