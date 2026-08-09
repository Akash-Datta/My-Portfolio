import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaNodeJs,
    FaGitAlt,
} from "react-icons/fa";

import {
    SiTailwindcss,
    SiMongodb,
} from "react-icons/si";

const Skills = () => {
    const skills = [
        { icon: FaHtml5, name: "HTML" },
        { icon: FaCss3Alt, name: "CSS" },
        { icon: FaJs, name: "JavaScript" },
        { icon: FaReact, name: "React.js" },
        { icon: SiTailwindcss, name: "Tailwind CSS" },
        { icon: FaNodeJs, name: "Node.js" },
        { icon: SiMongodb, name: "MongoDB" },
        { icon: FaGitAlt, name: "Git" },
    ];

    // Duplicate the array to create a seamless loop
    const repeated = [...skills, ...skills];

    const [dir, setDir] = useState(-1);
    const [active, setActive] = useState(false);

    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const touchY = useRef(null);

    const x = useMotionValue(0);

    // Detect when the Skills section is visible
    useEffect(() => {
        const el = sectionRef.current;

        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setActive(
                    entry.isIntersecting &&
                    entry.intersectionRatio > 0.1
                );
            },
            {
                threshold: [0.1],
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    // Change scrolling direction based on mouse wheel / touch
    useEffect(() => {
        if (!active) return;

        const onWheel = (e) => {
            setDir(e.deltaY > 0 ? -1 : 1);
        };

        const onTouchStart = (e) => {
            touchY.current = e.touches[0].clientY;
        };

        const onTouchMove = (e) => {
            if (touchY.current === null) return;

            const currentY = e.touches[0].clientY;
            const delta = currentY - touchY.current;

            setDir(delta > 0 ? 1 : -1);

            touchY.current = currentY;
        };

        const onTouchEnd = () => {
            touchY.current = null;
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, {
            passive: true,
        });
        window.addEventListener("touchmove", onTouchMove, {
            passive: true,
        });
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [active]);

    // Continuous horizontal animation
    useEffect(() => {
        let animationId;
        let last = performance.now();

        const speed = 80;

        const tick = (now) => {
            const deltaTime = (now - last) / 1000;
            last = now;

            let next = x.get() + speed * dir * deltaTime;

            const loop =
                trackRef.current?.scrollWidth / 2 || 0;

            if (loop) {
                if (next <= -loop) {
                    next += loop;
                }

                if (next >= 0) {
                    next -= loop;
                }
            }

            x.set(next);

            animationId = requestAnimationFrame(tick);
        };

        animationId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(animationId);
    }, [dir, x]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="
                relative flex h-1/2 w-full
                flex-col items-center justify-center
                overflow-hidden bg-black
                pb-8 text-white
            "
        >
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute left-0 top-1/4
                        h-[300px] w-[300px]
                        rounded-full
                        bg-gradient-to-r
                        from-[#302b63]
                        via-[#00bf8f]
                        to-[#1cd8d2]
                        opacity-20
                        blur-[120px]
                        animate-pulse
                    "
                />

                <div
                    className="
                        absolute bottom-1/4 right-0
                        h-[300px] w-[300px]
                        rounded-full
                        bg-gradient-to-r
                        from-[#302b63]
                        via-[#00bf8f]
                        to-[#1cd8d2]
                        opacity-20
                        blur-[120px]
                        animate-pulse
                    "
                />
            </div>

            {/* Heading */}
            <motion.h2
                className="
                    z-10 mt-5
                    bg-gradient-to-r
                    from-[#1cd8d2]
                    via-[#00bf8f]
                    to-[#302b63]
                    bg-clip-text
                    text-4xl font-bold
                    text-transparent
                    sm:text-5xl
                "
                initial={{
                    opacity: 0,
                    y: -30,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.1,
                }}
                viewport={{ once: true }}
            >
                My Skills
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                className="
                    z-10 mt-2 mb-8
                    text-base text-white/90
                    sm:text-lg
                "
                initial={{
                    opacity: 0,
                    y: -10,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.1,
                }}
                viewport={{ once: true }}
            >
                Modern Applications | Modern Technologies
            </motion.p>

            {/* Skills Track */}
            <div className="relative w-full overflow-hidden">
                <motion.div
                    ref={trackRef}
                    style={{
                        x,
                        whiteSpace: "nowrap",
                        willChange: "transform",
                    }}
                    className="
                        flex w-max
                        gap-10
                        text-6xl
                        text-[#1cd8d2]
                    "
                >
                    {repeated.map((skill, index) => {
                        const Icon = skill.icon;

                        return (
                            <div
                                key={`${skill.name}-${index}`}
                                className="
                                    flex min-w-[120px]
                                    flex-col items-center
                                    gap-2
                                "
                                aria-label={skill.name}
                                title={skill.name}
                            >
                                <span
                                    className="
                                        transition-transform
                                        duration-300
                                        hover:scale-125
                                    "
                                >
                                    <Icon />
                                </span>

                                <p className="text-sm text-white">
                                    {skill.name}
                                </p>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};


export default Skills;
