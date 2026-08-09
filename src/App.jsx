
import React from "react";

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";
import About from "./sections/About";
import Contact from "./sections/contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/projects";
import Skills from "./sections/Skills";
import IntroAnimation from "./components/IntroAnimation";

function App() {
  const [introDone, setIntroDone] = React.useState(false);

  // Controls the intro animation when clicking
  // "View Project" on My Portfolio
  const [showPortfolioIntro, setShowPortfolioIntro] =
    React.useState(false);

  const handlePortfolioClick = () => {
    setShowPortfolioIntro(true);
  };

  const handleIntroFinish = () => {
    setShowPortfolioIntro(false);
  };

  return (
    <>
      {/* Initial intro animation */}
      {!introDone && (
        <IntroAnimation
          onFinish={() => setIntroDone(true)}
        />
      )}

      {/* Intro animation when My Portfolio is clicked */}
      {showPortfolioIntro && (
        <IntroAnimation
          onFinish={handleIntroFinish}
        />
      )}

      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />

          <Navbar />

          <Home />

          <About />

          <Skills />

          <Projects
            onPortfolioClick={handlePortfolioClick}
          />

          <Experience />

          <Contact />

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;

