
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import tictactoeS from "../assets/tictactoeS.jpg";
import tictactoeB from "../assets/tictactoeB.jpg";

import NatureS from "../assets/NatureS.jpg";
import NatureB from "../assets/NatureB.jpg";

import portfolioS from "../assets/portfolioS.jpg";
import portfolioB from "../assets/portfolioB.jpg";

// ======================================================
// MOBILE DETECTION
// ======================================================

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return isMobile;
};

// ======================================================
// PROJECTS COMPONENT
// ======================================================

const Projects = ({ onPortfolioClick }) => {
  const isMobile = useIsMobile();

  const sceneRef = useRef(null);

  const autoScrollTimeoutRef = useRef(null);
  const userScrollingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  // ====================================================
  // PROJECT DATA
  // ====================================================

  const projects = useMemo(
    () => [
      {
        title: "Tic-Tac-Toe",

        link: "https://tic-tac-toe-two-kappa-94.vercel.app/",

        bgColor: "#0d4d3d",

        image: isMobile ? tictactoeS : tictactoeB,
      },

      {
        title: "GreenLink",

        link: "",

        bgColor: "#3884d3",

        image: isMobile ? NatureS : NatureB,
      },

      {
        title: "My Portfolio",

        link: null,

        bgColor: "#dc9317",

        image: isMobile ? portfolioS : portfolioB,
      },
    ],
    [isMobile]
  );

  // ====================================================
  // SCROLL PROGRESS
  // ====================================================

  const { scrollYProgress } = useScroll({
    target: sceneRef,

    offset: ["start start", "end end"],
  });

  // ====================================================
  // MANUAL SCROLL
  // ====================================================

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (value) => {
      const totalProjects = projects.length;

      let index = Math.floor(value * totalProjects);

      if (index >= totalProjects) {
        index = totalProjects - 1;
      }

      if (index < 0) {
        index = 0;
      }

      setActiveIndex(index);
    }
  );

  // ====================================================
  // AUTOMATIC PROJECT SWITCHING
  // ====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      if (userScrollingRef.current) {
        return;
      }

      if (!sceneRef.current) {
        return;
      }

      const rect = sceneRef.current.getBoundingClientRect();

      const isVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0;

      if (!isVisible) {
        return;
      }

      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % projects.length;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [projects.length]);

  // ====================================================
  // USER SCROLL DETECTION
  // ====================================================

  useEffect(() => {
    const handleWheel = () => {
      userScrollingRef.current = true;

      clearTimeout(autoScrollTimeoutRef.current);

      autoScrollTimeoutRef.current = setTimeout(() => {
        userScrollingRef.current = false;
      }, 1500);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);

      clearTimeout(autoScrollTimeoutRef.current);
    };
  }, []);

  // ====================================================
  // ACTIVE PROJECT
  // ====================================================

  const activeProject =
    projects[activeIndex] || projects[0];

  // ====================================================
  // VIEW PROJECT HANDLER
  // ====================================================

  const handleViewProject = (event) => {
    // My Portfolio
    if (activeProject.title === "My Portfolio") {
      event.preventDefault();

      if (onPortfolioClick) {
        onPortfolioClick();
      }

      return;
    }

    // Projects without a link
    if (!activeProject.link) {
      event.preventDefault();
    }
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      id="projects"
      className="relative w-full text-white"
    >
      {/* ==================================================
          SMALL GAP FROM PREVIOUS SECTION
      ================================================== */}

      <div
        className="
          w-full
          h-[4vh]
          sm:h-[6vh]
          bg-black
        "
      />

      {/* ==================================================
          PROJECT SCENE
      ================================================== */}

      <div
        ref={sceneRef}
        className="
          relative
          isolate
          z-0
          w-full
          h-[86vh]
          sm:h-[88vh]
        "
        style={{
          backgroundColor: activeProject.bgColor,
          transition: "background-color 500ms ease",
        }}
      >
        {/* ==================================================
            PROJECT VIEWPORT
        ================================================== */}

        <div
          className="
            relative
            h-full
            w-full
            overflow-hidden
          "
        >
          {/* =================================================
              MY WORKS TITLE
          ================================================= */}

          <h2
            className={`
              absolute
              left-1/2
              -translate-x-1/2
              z-30
              text-3xl
              font-semibold
              text-center
              whitespace-nowrap

              ${
                isMobile
                  ? "top-4"
                  : "top-7 sm:top-8"
              }
            `}
          >
            My Works
          </h2>

          {/* =================================================
              PROJECT DISPLAY
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2

                  transition-all
                  duration-700
                  ease-in-out

                  ${
                    activeIndex === index
                      ? "opacity-100 z-20 scale-100"
                      : "opacity-0 z-0 scale-95 pointer-events-none"
                  }
                `}
                style={{
                  width: isMobile ? "90%" : "85%",
                  maxWidth: "1200px",
                }}
              >
                {/* =========================================
                    PROJECT TITLE
                ========================================== */}

                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.h3
                      key={project.title}
                      initial={{
                        opacity: 0,
                        y: -20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 20,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className={`
                        text-white/95
                        italic
                        font-semibold
                        z-30

                        ${
                          isMobile
                            ? `
                              relative
                              text-[clamp(2rem,9vw,3rem)]
                              text-center
                              mb-3
                            `
                            : `
                              absolute
                              left-0
                              -top-4
                              w-full
                              text-[clamp(2rem,4vw,3.5rem)]
                              text-center
                            `
                        }
                      `}
                    >
                      {project.title}
                    </motion.h3>
                  )}
                </AnimatePresence>

                {/* =========================================
                    PROJECT IMAGE
                ========================================== */}

                <div
                  className={`
                    relative
                    w-full
                    overflow-hidden
                    bg-black/20
                    shadow-2xl

                    ${
                      isMobile
                        ? `
                          mb-4
                          rounded-lg
                          h-[48vh]
                        `
                        : `
                          mb-6
                          rounded-xl
                          h-[54vh]
                          sm:h-[56vh]
                        `
                    }
                  `}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      drop-shadow-xl
                      md:drop-shadow-2xl
                    "
                    style={{
                      position: "relative",
                      zIndex: 10,
                      filter:
                        "drop-shadow(0,16px,40px rgba(0,0,0,0.65))",
                      transition: "filter 200ms ease",
                    }}
                    loading="lazy"
                  />

                  {/* =======================================
                      IMAGE OVERLAY
                  ======================================== */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                    "
                    style={{
                      zIndex: 11,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* =================================================
              VIEW PROJECT BUTTON
          ================================================= */}

          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              bottom-5
              sm:bottom-6
              z-40
            "
          >
            <a
              href={
                activeProject.title === "My Portfolio"
                  ? "#"
                  : activeProject.link || "#"
              }
              target={
                activeProject.title === "My Portfolio"
                  ? undefined
                  : activeProject.link
                    ? "_blank"
                    : undefined
              }
              rel={
                activeProject.title === "My Portfolio"
                  ? undefined
                  : activeProject.link
                    ? "noopener noreferrer"
                    : undefined
              }
              className="
                inline-block
                px-5
                py-2.5
                sm:px-6
                sm:py-3
                font-semibold
                rounded-lg
                bg-white
                text-black
                hover:bg-gray-200
                transition-all
                duration-300
              "
              aria-label={`View ${activeProject.title}`}
              onClick={handleViewProject}
            >
              View Project
            </a>
          </div>

          {/* =================================================
              PROJECT INDICATORS
          ================================================= */}

          <div
            className="
              absolute
              bottom-6
              right-4
              sm:right-8
              z-40
              flex
              gap-2
            "
          >
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() => {
                  setActiveIndex(index);

                  userScrollingRef.current = true;

                  clearTimeout(
                    autoScrollTimeoutRef.current
                  );

                  autoScrollTimeoutRef.current =
                    setTimeout(() => {
                      userScrollingRef.current = false;
                    }, 1500);
                }}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    activeIndex === index
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40"
                  }
                `}
                aria-label={`Show ${project.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

