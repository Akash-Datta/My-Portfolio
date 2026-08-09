
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import ParticlesBackground from "../components/ParticlesBackground";
import avator from "../assets/avator.png";

const socials = [
    {
        icon: FaInstagram,
        label: "Instagram",
        href: "https://www.instagram.com/akashdatta954/",
    },
    {
        icon: FaLinkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/akash-datta-10b870340",
    },
    {
        icon: FaGithub,
        label: "GitHub",
        href: "https://github.com/akash-datta",
    },
];

const glowVariants = {
    initial: {
        scale: 1,
        y: 0,
        filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
    },

    hover: {
        scale: 1.2,
        y: -3,
        filter:
            "drop-shadow(0 0 8px rgba(13, 66, 284, 0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
        },
    },

    tap: {
        scale: 0.95,
        y: 0,
        transition: {
            duration: 0.08,
        },
    },
};

const Home = () => {
    const roles = useMemo(
        () => [
            "Web Developer",
            "MERN Stack Developer",
            "Frontend Developer",
            "React Developer",
        ],
        []
    );

    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    // Typing animation
    useEffect(() => {
        const current = roles[index];

        const timeout = setTimeout(
            () => {
                if (!deleting && subIndex < current.length) {
                    setSubIndex((value) => value + 1);
                } else if (!deleting && subIndex === current.length) {
                    setDeleting(true);
                } else if (deleting && subIndex > 0) {
                    setSubIndex((value) => value - 1);
                } else if (deleting && subIndex === 0) {
                    setDeleting(false);
                    setIndex((value) => (value + 1) % roles.length);
                }
            },
            deleting ? 40 : 70
        );

        return () => clearTimeout(timeout);
    }, [subIndex, index, deleting, roles]);

    return (
        <section
            id="home"
            className="relative h-screen w-full overflow-hidden bg-black"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div
                    className="
                        absolute -left-32 -top-32
                        h-[70vh] w-[70vw]
                        max-h-[500px] max-w-[500px]
                        rounded-full
                        bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
                        opacity-30
                        blur-[100px]
                        sm:h-[50vh] sm:w-[70vw] sm:blur-[130px]
                        sm:opacity-20
                        md:h-[40vh] md:w-[40vw]
                        md:blur-[150px]
                        md:opacity-10
                        animate-pulse
                    "
                />

                <div
                    className="
                        absolute -bottom-32 -right-32
                        h-[70vh] w-[70vw]
                        max-h-[500px] max-w-[500px]
                        rounded-full
                        bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
                        opacity-30
                        blur-[100px]
                        sm:h-[50vh] sm:w-[70vw] sm:blur-[130px]
                        sm:opacity-20
                        md:h-[40vh] md:w-[40vw]
                        md:blur-[150px]
                        md:opacity-10
                        animate-pulse
                    "
                />
            </div>

            {/* Optional Particle Background */}
            <ParticlesBackground />

            {/* Main Content */}
            <div
                className="
                    relative z-10 mx-auto grid h-full w-full max-w-7xl
                    grid-cols-1 px-4
                    lg:grid-cols-2
                "
            >
                {/* Left Content */}
                <div className="relative flex h-full flex-col justify-center text-center lg:text-left">
                    <div className="mx-auto w-full max-w-[48rem] lg:pr-24">
                        {/* Dynamic Role */}
                        <motion.div
                            className="
                                mb-3 min-h-[1.6em]
                                text-xl font-semibold tracking-wide text-white
                                sm:text-2xl
                                md:text-3xl
                                lg:text-4xl
                            "
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span>
                                {roles[index].substring(0, subIndex)}
                            </span>

                            <span
                                className="
                                    ml-1 inline-block
                                    w-[2px]
                                    animate-pulse
                                    bg-white
                                    align-middle
                                "
                                style={{ height: "1em" }}
                            />
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            className="
                                bg-gradient-to-r
                                from-[#1cd8d2]
                                via-[#00bf8f]
                                to-[#302b63]
                                bg-clip-text
                                text-4xl font-bold
                                text-transparent
                                drop-shadow-lg
                                sm:text-5xl
                                md:text-6xl
                                lg:text-7xl
                            "
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            Hello, I'm
                            <br />

                            <span
                                className="
                                    whitespace-nowrap
                                    text-5xl font-bold text-white
                                    sm:text-6xl
                                    md:text-7xl
                                    lg:text-8xl
                                "
                            >
                                Akash Datta
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="
                                mx-auto mt-6 max-w-2xl
                                text-base text-gray-300
                                sm:text-lg
                                md:text-xl
                                lg:mx-0
                            "
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                delay: 0.4,
                            }}
                        >
                            I turn complex ideas into seamless, high-impact
                            web experiences — building modern, scalable, and
                            lightning-fast applications that make a difference.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            className="
                                mt-10 flex flex-wrap
                                items-center justify-center gap-6
                                lg:justify-start
                            "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 0.8,
                                duration: 0.8,
                            }}
                        >
                            <a
                                href="#Projects"
                                className="
                                    rounded-full
                                    bg-gradient-to-r
                                    from-[#1cd8d2]
                                    via-[#00bf8f]
                                    to-[#302b63]
                                    px-6 py-3
                                    text-lg font-medium text-white
                                    shadow-lg
                                    transition-all
                                    hover:scale-105
                                "
                            >
                                View My Work
                            </a>

                            <a
                                href="/resume.pdf"
                                download
                                className="
                                    rounded-full
                                    bg-white
                                    px-6 py-3
                                    text-lg font-medium text-black
                                    shadow-lg
                                    transition-all
                                    hover:scale-105
                                    hover:bg-gray-200
                                "
                            >
                                My Resume
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="
                                mt-10 flex
                                justify-center gap-6
                                text-2xl
                                md:text-3xl
                                lg:justify-start
                            "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 1,
                                duration: 0.8,
                            }}
                        >
                            {socials.map(
                                ({ icon: Icon, label, href }) => (
                                    <motion.a
                                        href={href}
                                        key={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        variants={glowVariants}
                                        initial="initial"
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="text-gray-300 transition-colors hover:text-white"
                                    >
                                        <Icon />
                                    </motion.a>
                                )
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative hidden h-full lg:flex lg:items-center lg:justify-end">
                    {/* Glow behind avatar */}
                    <div
                        className="
            pointer-events-none
            absolute right-[8%] top-1/2
            -translate-y-1/2
            h-[70vh] w-[22vw]
            max-h-[650px] max-w-[400px]
            rounded-full
            opacity-30
            blur-[45px]
        "
                        style={{
                            background:
                                "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
                        }}
                    />

                    {/* Avatar */}
                    <motion.img
                        src={avator}
                        alt="Akash Datta"
                        className="
            relative z-10
            h-auto
            w-auto
            max-h-[82vh]
            max-w-[45vw]
            object-contain
            select-none
            pointer-events-none
        "
                        initial={{
                            opacity: 0,
                            x: 40,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Home;
