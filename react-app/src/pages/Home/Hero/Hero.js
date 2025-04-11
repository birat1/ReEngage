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

const features = [
  {
    image: Controller,
    title: "Games",
    body: "Enaging, interactive games to help children engage.",
  },
  {
    image: Store,
    title: "Virtual Currency",
    body: "In game currency to purchase avatars.",
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
    body: "Daily Tasks and facts to encourage lifelong learning.",
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
  const { ref: heroTextRef, inView: heroTextInView } = useInView({
    threshold: 0.3,
  });
  const { ref: heroVideoRef, inView: heroVideoInView } = useInView({
    threshold: 0.3,
  });
  const { ref: featuresTextRef, inView: featuresTextInView } = useInView({
    threshold: 0.3,
  });
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
  });
  const { ref: testimonialTextRef, inView: testimonialTextInView } = useInView({
    threshold: 0.3,
  });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0.3,
  });
  const { ref: joinRef, inView: joinInView } = useInView({
    threshold: 0.3,
  });

  return (
    <div className="hero">
      <section>
        <Container
          className="hero-section d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "50rem" }}
          fluid
        >
          <div className="d-flex flex-column text-center mt-3">
            <div
              className={`${heroTextInView ? "slide-from-left" : ""}`}
              style={{ opacity: 0 }}
              ref={heroTextRef}
            >
              <h1 className="fw-bolder">Learn Through Play with ReEngage</h1>
              <p className="fs-4">
                Exciting games and resources to make learning fun!
              </p>
            </div>
            <div
              className={`d-flex gap-2 mx-auto ${
                heroTextInView ? "slide-up" : ""
              }`}
              ref={heroTextRef}
              style={{ animationDelay: "0.1s", opacity: 0 }}
            >
              <button className="hero-button rounded-pill shadow-sm">
                Join Us
              </button>
              <button className="hero-button rounded-pill shadow-sm">
                Contact Us
              </button>
            </div>
          </div>
          <div
            className={`hero-video card shadow mt-4 ${
              heroVideoInView ? "slide-up" : ""
            }`}
            ref={heroVideoRef}
          ></div>
        </Container>
      </section>
      <section>
        <Container
          className="features-section"
          style={{ minHeight: "40rem" }}
          fluid
        >
          <div className="d-flex flex-column justify-content-center align-items-center pt-3">
            <div
              className={`d-flex flex-column justify-content-center align-items-center ${
                featuresTextInView ? "slide-from-left" : ""
              }`}
              style={{ opacity: 0 }}
              ref={featuresTextRef}
            >
              <h1 className="fw-bolder">Features</h1>
              <p className="fs-4">
                Say no to boring lessons and hello to gamification!
              </p>
            </div>
            <div
              className="d-flex flex-wrap justify-content-center align-items-center gap-4 mt-4"
              style={{ width: "60%" }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${featuresInView ? "slide-from-left" : ""}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  }}
                  ref={featuresRef}
                >
                  <FeatureCard
                    image={feature.image}
                    title={feature.title}
                    body={feature.body}
                    bgcolour="#A8D3E6"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container
          className="testimonials-section pt-5"
          style={{ minHeight: "40rem" }}
          fluid
        >
          <div className="d-flex flex-column justify-content-center align-items-center pt-5">
            <div
              className={`text-center ${
                testimonialTextInView ? "slide-from-left" : ""
              }`}
              style={{ opacity: 0 }}
              ref={testimonialTextRef}
            >
              <h1 className="fw-bolder">
                Loved by Children, Teachers, and Parents
              </h1>
              <p className="fs-4">
                What our current users have to say about ReEngage:
              </p>
            </div>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 mt-5">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`${testimonialsInView ? "slide-up" : ""}`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    opacity: 0,
                  }}
                  ref={testimonialsRef}
                >
                  <TestimonialCard
                    body={testimonial.body}
                    person={testimonial.person}
                    about={testimonial.about}
                    bgcolour="#b6dea2"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container
          className="join-section pt-5"
          style={{ minHeight: "30rem" }}
          fluid
        >
          <div className="d-flex flex-column justify-content-center align-items-center pt-5 gap-3">
            <div
              className={`text-center ${joinInView ? "slide-from-left" : ""}`}
              ref={joinRef}
              style={{ opacity: 0 }}
            >
              <h1 className="fw-bolder">Ready to elevate your learning?</h1>
              <p className="fs-4">
                Join the hundreds of schools and families using ReEnage
              </p>
            </div>
            <div
              className={`d-flex gap-2 mx-auto ${
                joinInView ? "slide-up" : ""
              }`}
              ref={joinRef}
              style={{ opacity: 0 }}
            >
              <button className="hero-button rounded-pill shadow-sm">
                Join Us
              </button>
              <button className="hero-button rounded-pill shadow-sm">
                Contact Us
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Hero;
