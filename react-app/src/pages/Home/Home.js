import Footer from "../../components/Footer/Footer.js";
import Hero from "./Hero/Hero.js";
import Dashboard from "../Dashboard/dashboard.js";
import {
  CheckLoggedIn,
  useAuthStatus,
} from "../../components/Authentication/CheckLoginStatus.js";

function Home() {
  const { isLoggedIn, isLoading } = useAuthStatus();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "calc(100vh - 76px)" }}
      >
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
