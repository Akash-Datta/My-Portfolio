import React from "react";
import { motion } from "framer-motion";
import akash from "../assets/akash.jpeg";

const About = () => {
    const stats = [
        {
            label: "Experience",
            value: "Student Developer",
        },
        {
            label: "Speciality",
            value: "Full Stack Development",
        },
        {
            label: "Focus",
            value: "Scalability & Performance",
        },
    ];

    const glows = [
        "absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse",

        "absolute -bottom-10 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[140px] animate-pulse",

        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-10 blur-[100px] animate-pulse",
    ];

    return (
        <section
            id="about"
            className="relative w-full overflow-hidden bg-black px-4 py-20 text-white sm:px-6 lg:px-8"
        >
            {/* Background Glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {glows.map((glow, index) => (
                    <div
                        key={index}
                        className={glow}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-6xl">
                <motion.div
                    className="grid items-center gap-10 md:grid-cols-[220px_1fr]"
                    initial={{
                        opacity: 0,
                        y: 24,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                >
                    {/* Profile Image */}
                    <motion.div
                        className="
                            relative mx-auto
                            h-[180px] w-[180px]
                            overflow-hidden rounded-2xl
                            border border-[#1cd8d2]/25
                            bg-gradient-to-br
                            from-[#1cd8d2]/20
                            to-[#302b63]/20
                            shadow-2xl
                            md:h-[220px] md:w-[220px]
                        "
                        whileHover={{
                            scale: 1.03,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 18,
                        }}
                    >
                        <img
                            src={akash}
                            alt="Akash Datta"
                            className="h-full w-full object-cover"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>

                    {/* About Content */}
                    <motion.div
                        className="text-center md:text-left"
                        initial={{
                            opacity: 0,
                            x: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
    About Me
</h3>

<p className="text-gray-300 leading-relaxed text-base sm:text-lg">
    I'm a curious and creative person who enjoys learning, building, and
    exploring new ideas. I love technology, football, and discovering how
    things work. I believe in staying curious, improving every day, and
    turning what I learn into something meaningful.
</p>

<p className="mt-4 text-gray-400 text-base sm:text-lg">
    I'm an Electronics and Communication Engineering student at Heritage
    Institute of Technology with a strong interest in software development
    and modern web technologies. I enjoy turning ideas into clean,
    interactive, and scalable digital experiences.
</p>

                        {/* Stats */}
                        <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                            {stats.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    className="
                                        rounded-xl
                                        border border-white/10
                                        bg-white/5
                                        px-4 py-4
                                        backdrop-blur-sm
                                    "
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.05 * index,
                                        duration: 0.4,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.3,
                                    }}
                                >
                                    <div className="text-sm text-gray-400">
                                        {item.label}
                                    </div>

                                    <div className="mt-1 text-sm font-semibold text-white sm:text-base">
                                        {item.value}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 md:justify-start">
                            <a
                                href="#projects"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-white
                                    px-5 py-3
                                    font-semibold
                                    text-black
                                    transition
                                    hover:bg-gray-200
                                "
                            >
                                View Projects
                            </a>

                            <a
                                href="#contact"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border border-white/20
                                    bg-white/10
                                    px-5 py-3
                                    text-white
                                    transition
                                    hover:bg-white/20
                                "
                            >
                                Get In Touch
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;