import Navigationbar from "../../components/Navbar/Navbar.js";
import Footer from "../../components/Footer/Footer.js";
import Hero from "./Hero.js";

function Home () {
    return (
        <div>
            <Navigationbar/>
            <Hero />
            <Footer/>
        </div>
    );
}

export default Home;