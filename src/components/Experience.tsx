"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Zap } from "lucide-react";

const experiences = [
    {
        company: "Cartzlink",
        role: "Full-stack Developer",
        period: "Oct 2024 — Present",
        desc: "Architecting custom ERP, CRM, and Production systems. Leading maintenance for WIP Commander and engineered AI-integrated systems for NHS UK.",
        tags: ["PHP", "Laravel", "Django", "SQL Server"]
    },
    {
        company: "Quantum Leaps",
        role: "PHP Developer (Contract)",
        period: "Sep 2024 — Oct 2024",
        desc: "Delivered rapid CRUD architectures and static business modules while coordinating system requirements.",
        tags: ["PHP", "Architecture", "Consultancy"]
    }
];

export default function Experience() {
    return (
        <section id="experience" className="section-padding">
            <div className="container-width">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block underline decoration-2 underline-offset-4">Trajectory</span>
                    <h2 className="text-5xl font-black tracking-tighter">Professional <span className="text-muted/30 italic">Impact.</span></h2>
                </motion.div>

                <div className="space-y-6">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 md:p-12 rounded-[2.5rem] border border-border bg-card/10 hover:bg-card/50 transition-all duration-500 overflow-hidden relative"
                        >
                            <div className="flex flex-col md:flex-row gap-8 justify-between relative z-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-2 rounded-xl bg-accent/10 text-accent">
                                            <Briefcase size={20} />
                                        </div>
                                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                                    </div>
                                    <p className="text-lg text-foreground/70 mb-8 max-w-2xl leading-relaxed">
                                        {exp.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map(tag => (
                                            <span key={tag} className="px-4 py-1.5 rounded-full bg-border/40 text-[10px] font-black uppercase tracking-widest text-muted">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:min-w-[200px] flex flex-col md:items-end gap-3">
                                    <span className="text-xl font-black">{exp.company}</span>
                                    <div className="flex items-center gap-2 text-muted text-sm font-bold uppercase tracking-widest">
                                        <Calendar size={14} />
                                        <span>{exp.period}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Subtle background glow on hover */}
                            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-accent/5 blur-[80px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
