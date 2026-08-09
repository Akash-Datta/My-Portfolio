
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const IntroAnimation = ({ onFinish }) => {
    const greetings = useMemo(
        () => [
            "Hello",
            "नमस्ते",
            "Hola",
            "Bonjour",
            "Ciao",
            "Olá",
            "Здравствуйте",
            "Merhaba",
            "Γειά",
            "Hej",
            "Hallo",
            "Salam",
            "নমস্কার",
        ],
        []
    );

    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (index < greetings.length - 1) {
            const id = setTimeout(() => {
                setIndex((i) => i + 1);
            }, 180);

            return () => clearTimeout(id);
        }

        // Keep the final greeting visible for 3 seconds
        const timeout = setTimeout(() => {
            setVisible(false);

            // Notify parent component that intro is finished
            if (onFinish) {
                onFinish();
            }
        }, 1500);

        return () => clearTimeout(timeout);
    }, [index, greetings.length, onFinish]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="
                        fixed inset-0 z-[9999]
                        flex items-center justify-center
                        overflow-hidden
                        bg-black text-white
                    "
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: {
                            duration: 1.05,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={index}
                            className="
                                text-5xl font-bold
                                md:text-7xl
                                lg:text-8xl
                            "
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                            }}
                            transition={{
                                duration: 0.12,
                            }}
                        >
                            {greetings[index]}
                        </motion.h1>
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroAnimation;