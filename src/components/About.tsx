"use client";

import { motion } from "framer-motion";
import type { AboutContent } from "@/lib/content";

interface AboutProps {
    content: AboutContent;
}

export default function About({ content }: AboutProps) {
    return (
        <section id="about" className="section-padding bg-card/30">
            <div className="container-width">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-accent text-sm font-bold uppercase tracking-[0.4em] mb-6">{content.sectionLabel}</h2>
                        <h3 className="text-4xl md:text-5xl font-black mb-10 leading-tight tracking-tighter">
                            {content.heading} <br />
                            <span className="text-muted/40">{content.subheading}</span>
                        </h3>
                        <div className="w-16 h-1 bg-accent rounded-full mb-10" />

                        <div className="flex flex-col gap-8 text-lg font-medium text-foreground/60 leading-relaxed">
                            {content.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        {content.cards.map((card, i) => (
                            <div key={i} className="p-10 rounded-[2rem] border border-border bg-background shadow-sm hover:shadow-xl transition-shadow duration-500">
                                <p className="text-xl font-bold mb-4">{card.title}</p>
                                <p className="text-muted text-sm leading-relaxed">{card.description}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
