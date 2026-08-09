import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useEffect, useRef, useState } from "react";

// ======================================================
// DEVELOPMENT EXPERIENCE DATA
// ======================================================

const experiences = [
  {
    role: "Database Management",
    area: "Intracollege Hackathon • HITK",
    duration: "2025",
    description:
      "Worked with database management and data handling during an intracollege hackathon, gaining practical experience in solving problems under time constraints.",
  },
  {
    role: "Web Development",
    area: "HTML • CSS • JavaScript",
    duration: "2025",
    description:
      "Built a strong foundation in web development by practicing HTML, CSS and JavaScript and creating interactive web interfaces.",
  },
  {
    role: "Frontend Development",
    area: "React.js • Modern Web",
    duration: "2025",
    description:
      "Started building React-based projects and gained hands-on experience with component-based development, modern UI design and frontend technologies.",
  },
];

// ======================================================
// EXPERIENCE ITEM
// ======================================================

function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
  layout,
}) {
  // ----------------------------------------------------
  // ANIMATION VALUES
  // ----------------------------------------------------

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [0.7, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 35 : -35, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [-30, 0]
  );

  // ====================================================
  // DESKTOP EXPERIENCE ITEM
  // ====================================================

  if (layout === "desktop") {
    return (
      <div
        className="
          relative
          flex-1
          h-full
          flex
          items-center
          justify-center
          min-w-0
        "
      >
        {/* ------------------------------------------------
            TIMELINE NODE
        ------------------------------------------------ */}

        <motion.div
          className="
            relative
            z-20
            w-7
            h-7
            rounded-full
            bg-white
            shadow-[0_0_0_8px_rgba(255,255,255,0.1)]
          "
          style={{
            scale,
            opacity,
          }}
        />

        {/* ------------------------------------------------
            CONNECTOR
        ------------------------------------------------ */}

        <motion.div
          className={`
            absolute
            w-[3px]
            bg-white/40
            ${
              idx % 2 === 0
                ? "bottom-[50%]"
                : "top-[50%]"
            }
          `}
          style={{
            height: 40,
            opacity,
          }}
        />

        {/* ------------------------------------------------
            EXPERIENCE CARD
        ------------------------------------------------ */}

        <motion.article
          className={`
            absolute
            ${
              idx % 2 === 0
                ? "bottom-[calc(50%+55px)]"
                : "top-[calc(50%+55px)]"
            }

            w-[300px]
            max-w-[28vw]

            bg-gray-900/80
            backdrop-blur-md

            border
            border-gray-700/70

            rounded-xl

            p-6

            shadow-xl
          `}
          style={{
            opacity,
            y,
          }}
          transition={{
            duration: 0.4,
            delay: idx * 0.15,
          }}
        >
          <h3 className="text-xl font-semibold text-white">
            {exp.role}
          </h3>

          <p className="mt-2 mb-3 text-sm text-gray-400">
            {exp.area}{" "}
            <span className="text-gray-600">
              |
            </span>{" "}
            {exp.duration}
          </p>

          <p className="text-sm leading-relaxed text-gray-300 break-words">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  // ====================================================
  // MOBILE EXPERIENCE ITEM
  // ====================================================

  return (
    <div className="relative flex items-start">
      {/* ------------------------------------------------
          TIMELINE NODE
      ------------------------------------------------ */}

      <motion.div
        className="
          absolute
          -left-[14px]
          top-5

          z-20

          w-7
          h-7

          rounded-full

          bg-white

          shadow-[0_0_0_8px_rgba(255,255,255,0.1)]
        "
        style={{
          scale,
          opacity,
        }}
      />

      {/* ------------------------------------------------
          EXPERIENCE CARD
      ------------------------------------------------ */}

      <motion.article
        className="
          w-full
          max-w-sm

          ml-6

          p-5

          bg-gray-900/80
          backdrop-blur-md

          border
          border-gray-700/70

          rounded-xl

          shadow-xl
        "
        style={{
          opacity,
          x,
        }}
        transition={{
          duration: 0.4,
          delay: idx * 0.15,
        }}
      >
        <h3 className="text-lg font-semibold text-white break-words">
          {exp.role}
        </h3>

        <p className="mt-1 text-sm text-gray-400 break-words">
          {exp.area}{" "}
          <span className="text-gray-600">
            |
          </span>{" "}
          {exp.duration}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-gray-300 break-words">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

// ======================================================
// EXPERIENCE COMPONENT
// ======================================================

const Experience = () => {
  const sceneRef = useRef(null);

  const [isMobile, setIsMobile] =
    useState(false);

  // ====================================================
  // MOBILE DETECTION
  // ====================================================

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkMobile
      );
    };
  }, []);

  // ====================================================
  // SCENE HEIGHT
  // ====================================================

  const sceneHeightVh = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  // ====================================================
  // SCROLL PROGRESS
  // ====================================================

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  // ====================================================
  // TIMELINE PROGRESS
  // ====================================================

  const lineSize = useTransform(
    scrollYProgress,
    (value) => `${value * 100}%`
  );

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      id="experience"
      ref={sceneRef}
      style={{
        height: `${sceneHeightVh}vh`,
      }}
      className="
        relative
        w-full
        min-h-screen
        bg-black
        text-white
      "
    >
      {/* ==================================================
          STICKY VIEWPORT
      ================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
        "
      >
        {/* =================================================
            SECTION TITLE
        ================================================= */}

        <h2
          className="
            absolute
            top-8
            left-1/2
            -translate-x-1/2

            z-30

            text-3xl
            sm:text-4xl

            font-semibold

            whitespace-nowrap
          "
        >
          My Experience
        </h2>

        {/* =================================================
            DESKTOP TIMELINE
        ================================================= */}

        {!isMobile && (
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center

              px-8
              lg:px-16

              pt-16
            "
          >
            <div
              className="
                relative

                w-full
                max-w-6xl

                h-[600px]
              "
            >
              {/* ------------------------------------------------
                  BASE TIMELINE
              ------------------------------------------------ */}

              <div
                className="
                  absolute

                  left-0
                  right-0

                  top-1/2

                  h-[3px]

                  -translate-y-1/2

                  bg-white/20

                  rounded-full
                "
              />

              {/* ------------------------------------------------
                  ANIMATED TIMELINE
              ------------------------------------------------ */}

              <motion.div
                className="
                  absolute

                  left-0
                  top-1/2

                  h-[3px]

                  -translate-y-1/2

                  bg-white

                  rounded-full

                  origin-left
                "
                style={{
                  width: lineSize,
                }}
              />

              {/* ------------------------------------------------
                  EXPERIENCE ITEMS
              ------------------------------------------------ */}

              <div
                className="
                  relative

                  flex
                  items-center

                  w-full
                  h-full
                "
              >
                {experiences.map(
                  (exp, idx) => {
                    const start =
                      idx /
                      experiences.length;

                    const end =
                      (idx + 1) /
                      experiences.length;

                    return (
                      <ExperienceItem
                        key={idx}
                        exp={exp}
                        idx={idx}
                        start={start}
                        end={end}
                        scrollYProgress={
                          scrollYProgress
                        }
                        layout="desktop"
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            MOBILE TIMELINE
        ================================================= */}

        {isMobile && (
          <div
            className="
              absolute
              inset-0

              overflow-y-auto

              px-6

              pt-28
              pb-20
            "
          >
            <div
              className="
                relative
                ml-4

                min-h-full
              "
            >
              {/* ------------------------------------------------
                  BASE VERTICAL TIMELINE
              ------------------------------------------------ */}

              <div
                className="
                  absolute

                  left-0
                  top-0
                  bottom-0

                  w-[5px]

                  bg-white/20

                  rounded-full
                "
              />

              {/* ------------------------------------------------
                  ANIMATED VERTICAL TIMELINE
              ------------------------------------------------ */}

              <motion.div
                className="
                  absolute

                  left-0
                  top-0

                  w-[5px]

                  bg-white

                  rounded-full

                  origin-top
                "
                style={{
                  height: lineSize,
                }}
              />

              {/* ------------------------------------------------
                  EXPERIENCE ITEMS
              ------------------------------------------------ */}

              <div className="relative space-y-16">
                {experiences.map(
                  (exp, idx) => {
                    const start =
                      idx /
                      experiences.length;

                    const end =
                      (idx + 1) /
                      experiences.length;

                    return (
                      <ExperienceItem
                        key={idx}
                        exp={exp}
                        idx={idx}
                        start={start}
                        end={end}
                        scrollYProgress={
                          scrollYProgress
                        }
                        layout="mobile"
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;