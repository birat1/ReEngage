import Footer from "../../components/Footer/Footer.js";
import Hero from "./Hero/Hero.js";
import Dashboard from "../Dashboard/dashboard.js";
import { useAuthStatus } from "../../components/Authentication/CheckLoginStatus.js";

function Home() {
  const { isLoggedIn } = useAuthStatus();

  if (isLoggedIn) {
    return (
      <>
        <Dashboard />
        <Footer />
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
