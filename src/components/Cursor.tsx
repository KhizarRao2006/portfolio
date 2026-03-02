"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [style, setStyle] = useState<
        | "default" | "minimal" | "glow" | "ring" | "inverter" | "crosshair" | "blade"
        | "dotmatrix" | "reticle" | "vector" | "axis" | "eonpulse" | "hologram" | "cybertrail"
        | "quantum" | "plasma" | "orbital" | "impact" | "flare" | "ember" | "shockwave"
        | "phantom" | "magnet" | "gravity" | "ripple" | "elastic" | "warp" | "glitch"
        | "shard" | "hoverlift" | "spotlight" | "softfocus" | "pulsefade" | "snap" | "drift"
        | "blend" | "adaptiveechosurge" | "vortex" | "arcradial" | "spectragridlock" | "caliper"
        | "tracer" | "pinpoint"
    >("glow");

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 400, damping: 30 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    // Drift springs (slow follow)
    const driftX = useSpring(cursorX, { stiffness: 50, damping: 20 });
    const driftY = useSpring(cursorY, { stiffness: 50, damping: 20 });

    // Echo springs (adaptive echo surge)
    const echo1X = useSpring(cursorX, { stiffness: 300, damping: 30 });
    const echo1Y = useSpring(cursorY, { stiffness: 300, damping: 30 });
    const echo2X = useSpring(cursorX, { stiffness: 200, damping: 30 });
    const echo2Y = useSpring(cursorY, { stiffness: 200, damping: 30 });
    const echo3X = useSpring(cursorX, { stiffness: 100, damping: 30 });
    const echo3Y = useSpring(cursorY, { stiffness: 100, damping: 30 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [cursorX, cursorY, isVisible]);

    useEffect(() => {
        const handleSettings = (e: any) => {
            if (e.detail?.cursorStyle) setStyle(e.detail.cursorStyle);
        };
        window.addEventListener("settings-changed", handleSettings);

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        if (!isMobile) {
            window.addEventListener("mousemove", handleMouseMove);

            const handleMouseOver = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.closest("button, a, .clickable, input, select, textarea")) {
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
                window.removeEventListener("settings-changed", handleSettings);
            };
        }

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("settings-changed", handleSettings);
        };
    }, [handleMouseMove, isMobile]);

    if (isMobile || !isVisible || style === "default") return null;

    return (
        <>
            {/* 1. GLOW */}
            {style === "glow" && (
                <motion.div className="custom-cursor" style={{ left: springX, top: springY, x: "-50%", y: "-50%", scale: isHovered ? 2.5 : 1, opacity: isHovered ? 0.3 : 1 }} />
            )}

            {/* 2. RING */}
            {style === "ring" && (
                <motion.div className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%", scale: isHovered ? 1.5 : 1 }} />
            )}

            {/* 3. INVERTER */}
            {style === "inverter" && (
                <motion.div className="fixed top-0 left-0 w-12 h-12 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%", scale: isHovered ? 0.5 : 1 }} />
            )}

            {/* 4. CROSSHAIR */}
            {style === "crosshair" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY }}>
                    <motion.div className="absolute h-[1px] w-8 bg-accent -left-4" animate={{ width: isHovered ? 40 : 32, x: isHovered ? -4 : 0 }} />
                    <motion.div className="absolute w-[1px] h-8 bg-accent -top-4" animate={{ height: isHovered ? 40 : 32, y: isHovered ? -4 : 0 }} />
                </motion.div>
            )}

            {/* 5. BLADE */}
            {style === "blade" && (
                <motion.div className="fixed top-0 left-0 w-3 h-12 bg-accent pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%", rotate: 45, scale: isHovered ? 1.5 : 1 }} animate={{ rotate: isHovered ? 225 : 45 }} />
            )}

            {/* 6. DOTMATRIX */}
            {style === "dotmatrix" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY }}>
                    {[...Array(9)].map((_, i) => (
                        <motion.div key={i} className="absolute w-1 h-1 bg-accent rounded-full"
                            style={{
                                left: (i % 3 - 1) * 8,
                                top: (Math.floor(i / 3) - 1) * 8,
                                x: "-50%", y: "-50%"
                            }}
                            animate={{ opacity: isHovered ? (i === 4 ? 1 : 0.2) : 1 }}
                        />
                    ))}
                </motion.div>
            )}

            {/* 7. RETICLE */}
            {style === "reticle" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}>
                    <motion.div className="w-10 h-10 border-2 border-accent rounded-full" animate={{ scale: isHovered ? 1.2 : 1, rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full" />
                </motion.div>
            )}

            {/* 8. VECTOR */}
            {style === "vector" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY }}>
                    {[0, 90, 180, 270].map((r) => (
                        <motion.div key={r} className="absolute w-4 h-[2px] bg-accent origin-left" style={{ rotate: r, x: 10 }} animate={{ x: isHovered ? 14 : 10 }} />
                    ))}
                </motion.div>
            )}

            {/* 9. AXIS */}
            {style === "axis" && (
                <div className="fixed inset-0 pointer-events-none z-[9999]">
                    <motion.div className="absolute w-full h-[1px] bg-accent/20" style={{ top: cursorY }} />
                    <motion.div className="absolute h-full w-[1px] bg-accent/20" style={{ left: cursorX }} />
                </div>
            )}

            {/* 10. EONPULSE */}
            {style === "eonpulse" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}>
                    {[1, 2, 3].map((i) => (
                        <motion.div key={i} className="absolute inset-0 border border-accent rounded-full"
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                        />
                    ))}
                </motion.div>
            )}

            {/* 11. HOLOGRAM */}
            {style === "hologram" && (
                <motion.div className="fixed top-0 left-0 w-8 h-8 border border-accent/50 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}>
                    <motion.div className="absolute inset-0 bg-accent/10" animate={{ x: [-2, 2, -1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 0.1 }} />
                </motion.div>
            )}

            {/* 12. CYBERTRAIL */}
            {style === "cybertrail" && (
                <motion.div className="fixed top-0 left-0 border-2 border-accent w-6 h-6 rotate-45 pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%" }} />
            )}

            {/* 13. QUANTUM */}
            {style === "quantum" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY }}>
                    {[...Array(6)].map((_, i) => (
                        <motion.div key={i} className="absolute w-1.5 h-1.5 bg-accent rounded-full"
                            animate={{
                                x: [Math.cos(i) * 20, Math.cos(i + 2) * 20],
                                y: [Math.sin(i) * 20, Math.sin(i + 2) * 20],
                                scale: [1, 0.5, 1]
                            }}
                            transition={{ repeat: Infinity, duration: 1 + i * 0.2 }}
                        />
                    ))}
                </motion.div>
            )}

            {/* 14. PLASMA */}
            {style === "plasma" && (
                <motion.div className="fixed top-0 left-0 w-12 h-12 bg-accent/40 blur-xl rounded-full pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%" }} animate={{ scale: [1, 1.4, 0.9, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
            )}

            {/* 15. ORBITAL */}
            {style === "orbital" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}>
                    <motion.div className="w-12 h-12 border border-accent/20 rounded-full" />
                    <motion.div className="absolute w-2 h-2 bg-accent rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ originX: "24px", originY: "24px" }} />
                </motion.div>
            )}

            {/* 16. IMPACT */}
            {style === "impact" && (
                <motion.div className="fixed top-0 left-0 w-8 h-8 border-4 border-accent pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} animate={{ rotate: [0, 90], scale: isHovered ? 1.5 : 1 }} />
            )}

            {/* 17. FLARE */}
            {style === "flare" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY }}>
                    {[0, 120, 240].map((r) => (
                        <motion.div key={r} className="absolute w-1 h-12 bg-gradient-to-t from-accent to-transparent" style={{ rotate: r, originY: "bottom" }} animate={{ height: [40, 60, 40] }} transition={{ repeat: Infinity, duration: 0.5 }} />
                    ))}
                </motion.div>
            )}

            {/* 18. EMBER */}
            {style === "ember" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY }}>
                    {[...Array(5)].map((_, i) => (
                        <motion.div key={i} className="absolute w-1 h-1 bg-accent" animate={{ y: [-10, -40], x: [0, (i - 2) * 10], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} />
                    ))}
                </motion.div>
            )}

            {/* 19. SHOCKWAVE */}
            {style === "shockwave" && (
                <motion.div className="fixed top-0 left-0 w-16 h-16 border-2 border-accent/30 rounded-full pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%" }} animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            )}

            {/* 20. PHANTOM */}
            {style === "phantom" && (
                <>
                    <motion.div className="fixed top-0 left-0 w-6 h-6 bg-accent/20 rounded-full pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} />
                    <motion.div className="fixed top-0 left-0 w-6 h-6 bg-accent opacity-10 rounded-full pointer-events-none z-[9998]" style={{ left: springX, top: springY, x: "-50%", y: "-50%" }} />
                </>
            )}

            {/* 21. MAGNET */}
            {style === "magnet" && (
                <motion.div className="fixed top-0 left-0 w-6 h-6 border-2 border-accent pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%", borderRadius: isHovered ? "0%" : "50%" }} />
            )}

            {/* 22. GRAVITY */}
            {style === "gravity" && (
                <motion.div className="fixed top-0 left-0 w-12 h-12 border border-accent/10 rounded-full pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} animate={{ scale: isHovered ? 0.2 : 1 }} />
            )}

            {/* 23. RIPPLE */}
            {style === "ripple" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}>
                    <motion.div className="w-10 h-10 border border-accent rounded-full" animate={{ scale: [1, 3], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} />
                </motion.div>
            )}

            {/* 24. ELASTIC */}
            {style === "elastic" && (
                <motion.div className="fixed top-0 left-0 w-6 h-6 bg-accent pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%", scaleX: isHovered ? 2 : 1 }} />
            )}

            {/* 25. WARP */}
            {style === "warp" && (
                <motion.div className="fixed top-0 left-0 w-10 h-10 border border-accent pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%" }} animate={{ borderRadius: ["50% 50% 50% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%"] }} transition={{ repeat: Infinity, duration: 2 }} />
            )}

            {/* 26. GLITCH */}
            {style === "glitch" && (
                <motion.div className="fixed top-0 left-0 w-6 h-6 bg-accent pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} animate={{ x: ["-50%", "-48%", "-52%", "-50%"], rotate: [0, 3, -3, 0] }} transition={{ repeat: Infinity, duration: 0.1 }} />
            )}

            {/* 27. SHARD */}
            {style === "shard" && (
                <motion.div className="fixed top-0 left-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-accent pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} animate={{ rotate: isHovered ? 180 : 0 }} />
            )}

            {/* 28. HOVERLIFT */}
            {style === "hoverlift" && (
                <motion.div className="fixed top-0 left-0 w-4 h-4 bg-accent pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%", scale: isHovered ? 8 : 1 }} />
            )}

            {/* 29. SPOTLIGHT */}
            {style === "spotlight" && (
                <motion.div className="fixed top-0 left-0 w-40 h-40 bg-accent/5 blur-3xl rounded-full pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} />
            )}

            {/* 30. SOFTFOCUS */}
            {style === "softfocus" && (
                <motion.div className="fixed top-0 left-0 w-20 h-20 bg-accent/20 blur-xl rounded-full pointer-events-none z-[9999]" style={{ left: springX, top: springY, x: "-50%", y: "-50%" }} />
            )}

            {/* 31. PULSEFADE */}
            {style === "pulsefade" && (
                <motion.div className="fixed top-0 left-0 w-6 h-6 bg-accent rounded-full pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            )}

            {/* 32. SNAP */}
            {style === "snap" && (
                <motion.div className="fixed top-0 left-0 w-4 h-4 border-2 border-accent pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} />
            )}

            {/* 33. DRIFT */}
            {style === "drift" && (
                <motion.div className="fixed top-0 left-0 w-6 h-6 border-2 border-accent rounded-full pointer-events-none z-[9999]" style={{ left: driftX, top: driftY, x: "-50%", y: "-50%" }} />
            )}

            {/* 34. BLEND */}
            {style === "blend" && (
                <motion.div className="fixed top-0 left-0 w-16 h-16 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} />
            )}

            {/* 35. ADAPTIVEECHOSURGE */}
            {style === "adaptiveechosurge" && (
                <>
                    <motion.div className="fixed top-0 left-0 w-6 h-6 border border-accent rounded-full pointer-events-none z-[9999]" style={{ left: echo1X, top: echo1Y, x: "-50%", y: "-50%", opacity: 0.8 }} />
                    <motion.div className="fixed top-0 left-0 w-6 h-6 border border-accent rounded-full pointer-events-none z-[9999]" style={{ left: echo2X, top: echo2Y, x: "-50%", y: "-50%", opacity: 0.5 }} />
                    <motion.div className="fixed top-0 left-0 w-6 h-6 border border-accent rounded-full pointer-events-none z-[9999]" style={{ left: echo3X, top: echo3Y, x: "-50%", y: "-50%", opacity: 0.2 }} />
                </>
            )}

            {/* 36. VORTEX */}
            {style === "vortex" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}>
                    <motion.div className="w-10 h-10 border-t-2 border-accent rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} />
                </motion.div>
            )}

            {/* 37. ARCRADIAL */}
            {style === "arcradial" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}>
                    <svg width="40" height="40" viewBox="0 0 40 40">
                        <motion.circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="30 60" className="text-accent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
                    </svg>
                </motion.div>
            )}

            {/* 38. SPECTRAGRIDLOCK */}
            {style === "spectragridlock" && (
                <motion.div className="fixed top-0 left-0 w-6 h-6 border border-accent pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }} />
            )}

            {/* 39. CALIPER */}
            {style === "caliper" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY }}>
                    <motion.div className="absolute w-[2px] h-12 bg-accent -left-6 -top-6" animate={{ x: isHovered ? -10 : 0 }} />
                    <motion.div className="absolute w-[2px] h-12 bg-accent left-6 -top-6" animate={{ x: isHovered ? 10 : 0 }} />
                </motion.div>
            )}

            {/* 40. TRACER */}
            {style === "tracer" && (
                <div className="fixed inset-0 pointer-events-none z-[9999]">
                    <motion.div className="absolute h-[1px] bg-accent/40" style={{ left: 0, top: cursorY, width: "100%" }} />
                </div>
            )}

            {/* 41. PINPOINT */}
            {style === "pinpoint" && (
                <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ left: cursorX, top: cursorY }}>
                    <div className="w-1 h-1 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <motion.span className="absolute left-4 top-4 text-[8px] font-mono text-accent whitespace-nowrap">
                        {Math.round(cursorX.get())} : {Math.round(cursorY.get())}
                    </motion.span>
                </motion.div>
            )}

            {/* 42. CORE DOT (Fallback / Constant) */}
            {["minimal", "reticle", "dotmatrix", "crosshair", "vector", "orbital", "shockwave", "snap", "vortex", "pinpoint"].includes(style) && (
                <motion.div className="custom-cursor-dot" style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%", scale: isHovered ? 1.5 : 1, backgroundColor: style === "crosshair" ? "transparent" : "var(--accent)", border: style === "crosshair" ? "1px solid var(--accent)" : "none" }} />
            )}
        </>
    );
}
