"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 400, damping: 30 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [cursorX, cursorY, isVisible]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        if (!isMobile) {
            window.addEventListener("mousemove", handleMouseMove);

            const handleMouseOver = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.closest("button, a, .clickable")) {
                    setIsHovered(true);
                } else {
                    setIsHovered(false);
                }
            };

            window.addEventListener("mouseover", handleMouseOver);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseover", handleMouseOver);
                window.removeEventListener("resize", checkMobile);
            };
        }

        return () => window.removeEventListener("resize", checkMobile);
    }, [handleMouseMove, isMobile]);

    if (isMobile || !isVisible) return null;

    return (
        <>
            <motion.div
                className="custom-cursor"
                style={{
                    left: springX,
                    top: springY,
                    x: "-50%",
                    y: "-50%",
                    scale: isHovered ? 2.5 : 1,
                    opacity: isHovered ? 0.3 : 1,
                }}
            />
            <motion.div
                className="custom-cursor-dot"
                style={{
                    left: cursorX,
                    top: cursorY,
                    x: "-50%",
                    y: "-50%",
                }}
            />
        </>
    );
}
