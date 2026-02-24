"use client";

import { motion } from "framer-motion";

export default function About() {
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
                        <h2 className="text-accent text-sm font-bold uppercase tracking-[0.4em] mb-6">Expertise & Vision</h2>
                        <h3 className="text-4xl md:text-5xl font-black mb-10 leading-tight tracking-tighter">
                            Specialized in scaling <br />
                            <span className="text-muted/40">Enterprise Ecosystems.</span>
                        </h3>
                        <div className="w-16 h-1 bg-accent rounded-full mb-10" />

                        <div className="flex flex-col gap-8 text-lg font-medium text-foreground/60 leading-relaxed">
                            <p>
                                Full-stack and Mobile Application Developer with nearly 2 years of experience building web, mobile, and enterprise solutions.
                                I deliver systems that don&apos;t just work—they scale.
                            </p>
                            <p>
                                Specialized in <strong>ERP & CRM architecture</strong>, I solve complex business logic problems using modern high-performance stacks.
                                My focus is always on maintainability, performance, and clean code.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        <div className="p-10 rounded-[2rem] border border-border bg-background shadow-sm hover:shadow-xl transition-shadow duration-500">
                            <p className="text-xl font-bold mb-4">Architecture First</p>
                            <p className="text-muted text-sm leading-relaxed">
                                Whether it&apos;s a healthcare referral system for NHS UK or complex production software,
                                I prioritize scalable database designs and robust API layers.
                            </p>
                        </div>

                        <div className="p-10 rounded-[2rem] border border-border bg-background shadow-sm hover:shadow-xl transition-shadow duration-500">
                            <p className="text-xl font-bold mb-4">Multi-Stack Mastery</p>
                            <p className="text-muted text-sm leading-relaxed">
                                From PHP (Laravel/Yii) to Python Django, C# .NET to modern React/Next.js and Flutter ecosystems.
                                I choose the right tool for the specific business challenge.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
