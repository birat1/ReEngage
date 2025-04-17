import Container from "react-bootstrap/Container";
import FeatureCard from "./FeatureCard";
import TestimonialCard from "./TestimonialCard";
import "./styles/Hero.css";
import Controller from "../../../assets/images/Controller.png";
import Store from "../../../assets/images/Store.png";
import Bars from "../../../assets/images/Bars.png";
import List from "../../../assets/images/List.png";
import Brain from "../../../assets/images/Brain.png";
import Podium from "../../../assets/images/Podium.png";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";

// Feature and testimonial data
const features = [
  {
    image: Controller,
    title: "Games",
    body: "Engaging, interactive games to help children engage.",
  },
  {
    image: Store,
    title: "Virtual Currency",
    body: "In-game currency to purchase avatars.",
  },
  {
    image: Bars,
    title: "Progress Tracking",
    body: "Detailed analytics for parents and teachers to monitor learning.",
  },
  {
    image: List,
    title: "National Curriculum",
    body: "Resources closely aligned with the UK National Curriculum.",
  },
  {
    image: Brain,
    title: "Daily Learning",
    body: "Daily tasks and facts to encourage lifelong learning.",
  },
  {
    image: Podium,
    title: "Leaderboard",
    body: "Friendly competition to motivate children to engage with learning.",
  },
];

const testimonials = [
  {
    body: "My students can't wait for ReEngage time! It's made teaching so much more enjoyable and the progress tracking helps me identify areas where extra support is needed.",
    person: "Mrs. Thompson",
    about: "Year 4 Teacher, London",
  },
  {
    body: "My son used to struggle with maths, but the games on ReEngage have made it fun for him. He's now excited to practice his times tables and his confidence has grown tremendously.",
    person: "Sarah",
    about: "Parent of Year 5 pupil",
  },
  {
    body: "I love earning XP and leveling up on ReEngage! The games are really fun and I've learned so many cool facts. The daily streak keeps me coming back every day!",
    person: "Jamie",
    about: "Year 5 Student",
  },
];

function Hero() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: videoRef, inView: videoInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: joinRef, inView: joinInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="hero">
      {/* Hero Section */}
      <section>
        <Container
          fluid
          className="hero-section d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "50rem" }}
        >
          <div className="text-center mt-3" ref={heroRef}>
            <div className={classNames({ "slide-from-left": heroInView })} style={{ opacity: 0 }}>
              <h1 className="fw-bolder">Learn Through Play with ReEngage</h1>
              <p className="fs-4">Exciting games and resources to make learning fun!</p>
            </div>
            <div
              className={classNames("d-flex justify-content-center gap-3 mx-auto", { "slide-up": heroInView })}
              style={{ animationDelay: "0.1s", opacity: 0 }}
            >
              <button className="hero-button rounded-pill shadow-sm">Join Us</button>
              <button className="hero-button rounded-pill shadow-sm">Contact Us</button>
            </div>
          </div>

          <div
            className={classNames("hero-video card shadow mt-4", { "slide-up": videoInView })}
            ref={videoRef}
            style={{ opacity: 0 }}
          />
        </Container>
      </section>
      {/* Features Section */}
      <section>
        <Container fluid className="features-section" style={{ minHeight: "40rem" }}>
          <div className="d-flex flex-column justify-content-center align-items-center pt-3" ref={featuresRef}>
            <div className={classNames("text-center", { "slide-from-left": featuresInView })} style={{ opacity: 0 }}>
              <h1 className="fw-bolder">Features</h1>
              <p className="fs-4">Say no to boring lessons and hello to gamification!</p>
            </div>

            <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 mt-4" style={{ width: "60%" }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={classNames({ "slide-from-left": featuresInView })}
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <FeatureCard {...feature} bgcolour="#A8D3E6" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      {/* Testimonials Section */}
      <section>
        <Container fluid className="testimonials-section pt-5" style={{ minHeight: "40rem" }}>
          <div className="d-flex flex-column justify-content-center align-items-center pt-5" ref={testimonialsRef}>
            <div className={classNames("text-center", { "slide-from-left": testimonialsInView })} style={{ opacity: 0 }}>
              <h1 className="fw-bolder">Loved by Children, Teachers, and Parents</h1>
              <p className="fs-4">What our current users have to say about ReEngage:</p>
            </div>

            <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 mt-5">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={classNames({ "slide-up": testimonialsInView })}
                  style={{ animationDelay: `${index * 0.2}s`, opacity: 0 }}
                >
                  <TestimonialCard {...testimonial} bgcolour="#b6dea2" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      {/* Join Section */}
      <section>
        <Container fluid className="join-section pt-5" style={{ minHeight: "30rem" }}>
          <div className="d-flex flex-column justify-content-center align-items-center pt-5 gap-3" ref={joinRef}>
            <div className={classNames("text-center", { "slide-from-left": joinInView })} style={{ opacity: 0 }}>
              <h1 className="fw-bolder">Ready to elevate your learning?</h1>
              <p className="fs-4">Join the hundreds of schools and families using ReEngage</p>
            </div>

            <div
              className={classNames("d-flex gap-3 mx-auto", { "slide-up": joinInView })}
              style={{ opacity: 0 }}
            >
              <button className="hero-button rounded-pill shadow-sm">Join Us</button>
              <button className="hero-button rounded-pill shadow-sm">Contact Us</button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Hero;
