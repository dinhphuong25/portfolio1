"use client";

import { motion } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    duration?: number;
    className?: string;
    blur?: boolean;
    scale?: boolean;
    once?: boolean;
}

export default function Reveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    className = "",
    blur = true,
    scale = true,
    once = true,
}: RevealProps) {
    const getVariants = () => {
        const initialX = direction === "left" ? 40 : direction === "right" ? -40 : 0;
        const initialY = direction === "up" ? 40 : direction === "down" ? -40 : 0;

        return {
            hidden: {
                opacity: 0,
                x: initialX,
                y: initialY,
                scale: scale ? 0.95 : 1,
                filter: blur ? "blur(8px)" : "blur(0px)",
            },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
            },
        };
    };

    return (
        <motion.div
            variants={getVariants()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-40px" }}
            transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
                mass: 0.8,
                duration: duration,
                delay: delay / 1000,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
