"use client";

import { motion } from "framer-motion";
import { Download, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
    };

    return (
        <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
            {/* Background Subtle Gradient */}
            <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
                    <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-8 tracking-wider uppercase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Open for worldwide opportunities
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-balance"
                    >
                        Engineering <br />
                        <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/30">Excellence</span> <br />
                        in Software.
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-xl md:text-2xl text-foreground/60 mb-12 max-w-2xl leading-relaxed font-medium"
                    >
                        I&apos;m <span className="text-foreground">Khizar Rao</span>. A Senior Full-Stack & Mobile Developer specializing in high-fidelity products, scalable enterprise ecosystems, and business logic.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-wrap gap-4 items-center">
                        <Link
                            href="#contact"
                            className="px-8 py-4 rounded-2xl bg-foreground text-background font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl hover:shadow-accent/20"
                        >
                            Let&apos;s Build Something <ArrowRight size={20} />
                        </Link>

                        <div className="flex gap-2">
                            <a
                                href="/assets/khizar-rao-cv.pdf"
                                download
                                className="p-4 rounded-2xl border border-border hover:bg-muted/5 transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                                title="Download CV"
                            >
                                CV <Download size={18} />
                            </a>
                            <a
                                href="/assets/khizar-rao-resume.pdf"
                                download
                                className="p-4 rounded-2xl border border-border hover:bg-muted/5 transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                                title="Download Resume"
                            >
                                RESUME <Download size={18} />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="mt-20 flex items-center gap-12"
                    >
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">02+</span>
                            <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Years Exp.</span>
                        </div>
                        <div className="w-[1px] h-8 bg-border" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">20+</span>
                            <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Projects</span>
                        </div>
                        <div className="w-[1px] h-8 bg-border" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">10+</span>
                            <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Tech Stacks</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
