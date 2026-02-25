"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
    "Excellence",
    "Scalability",
    "Precision",
    "Innovation",
];

export default function TextScramble() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState(phrases[0]);
    const [isScrambling, setIsScrambling] = useState(false);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    const scramble = useCallback(
        (target: string) => {
            setIsScrambling(true);
            const duration = 600;
            const steps = 12;
            const stepDuration = duration / steps;
            let step = 0;

            const interval = setInterval(() => {
                step++;
                const progress = step / steps;
                const revealed = Math.floor(progress * target.length);

                let result = "";
                for (let i = 0; i < target.length; i++) {
                    if (i < revealed) {
                        result += target[i];
                    } else {
                        result += chars[Math.floor(Math.random() * chars.length)];
                    }
                }

                setDisplayText(result);

                if (step >= steps) {
                    clearInterval(interval);
                    setDisplayText(target);
                    setIsScrambling(false);
                }
            }, stepDuration);
        },
        [chars]
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = (prev + 1) % phrases.length;
                scramble(phrases[next]);
                return next;
            });
        }, 3500);

        return () => clearInterval(timer);
    }, [scramble]);

    return (
        <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/30 inline-block min-w-[200px]">
            {displayText}
        </span>
    );
}
