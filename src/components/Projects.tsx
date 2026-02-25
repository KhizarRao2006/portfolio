"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Layers, ChevronRight } from "lucide-react";
import { useState } from "react";

type ProjectCategory = "All" | "Enterprise" | "Web" | "Mobile" | "AI";

interface Project {
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    category: ProjectCategory;
    accent: string;
    links?: {
        live?: string;
        github?: string;
    };
    highlights: string[];
}

const projects: Project[] = [
    {
        title: "NHS Healthcare Referral System",
        description: "AI-integrated healthcare referral management system for NHS UK.",
        longDescription:
            "Engineered a comprehensive referral management platform handling patient data routing, appointment scheduling, and inter-department communication for NHS healthcare providers.",
        tags: ["Django", "Python", "SQL Server", "AI Integration"],
        category: "AI",
        accent: "from-blue-500/20 to-cyan-500/20",
        highlights: ["HIPAA-compliant architecture", "AI-powered triage", "Real-time referral tracking"],
    },
    {
        title: "WIP Commander",
        description: "Enterprise production tracking and work-in-progress management system.",
        longDescription:
            "Led maintenance and feature development for a large-scale production management platform used across manufacturing operations to track inventory, orders, and job progress.",
        tags: ["PHP", "Laravel", "SQL Server", "ERP"],
        category: "Enterprise",
        accent: "from-amber-500/20 to-orange-500/20",
        highlights: ["Production pipeline tracking", "Real-time dashboards", "Multi-tenant architecture"],
    },
    {
        title: "Custom ERP & CRM Suite",
        description: "Full-scale enterprise resource planning and customer relationship management.",
        longDescription:
            "Architected modular ERP and CRM solutions with custom business logic engines, role-based access control, and automated reporting for enterprise clients.",
        tags: ["PHP", "Laravel", "MySQL", "REST APIs"],
        category: "Enterprise",
        accent: "from-emerald-500/20 to-green-500/20",
        highlights: ["Modular architecture", "Role-based access", "Automated reporting"],
    },
    {
        title: "Portfolio Website",
        description: "Modern, high-performance portfolio with premium design and animations.",
        longDescription:
            "This very website — built with Next.js 16, Tailwind CSS v4, and Framer Motion. Features custom cursor, theme switching, glassmorphism, and a serverless contact form.",
        tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        category: "Web",
        accent: "from-violet-500/20 to-purple-500/20",
        links: {
            github: "https://github.com/khizarrao2006/portfolio",
        },
        highlights: ["Custom cursor engine", "Dark/light themes", "Serverless form handling"],
    },
    {
        title: "Market Teller",
        description: "AI-powered mobile app for stock market insights and portfolio tracking.",
        longDescription:
            "Developed a Flutter-based mobile application with Firebase backend featuring AI-driven market analysis, portfolio management, and real-time stock data visualization.",
        tags: ["Flutter", "Dart", "Firebase", "AI"],
        category: "Mobile",
        accent: "from-rose-500/20 to-pink-500/20",
        highlights: ["AI market analysis", "Real-time data", "Portfolio management"],
    },
    {
        title: "Enterprise Delivery Platform",
        description: "Multi-role logistics platform with real-time tracking and admin controls.",
        longDescription:
            "Built a comprehensive delivery management system supporting users, drivers, and restaurants with real-time order tracking, route optimization, and admin analytics.",
        tags: ["Flutter", "Firebase", "Node.js", "Cloud Functions"],
        category: "Mobile",
        accent: "from-sky-500/20 to-indigo-500/20",
        highlights: ["Multi-role system", "Real-time tracking", "Admin analytics"],
    },
];

const categories: ProjectCategory[] = ["All", "Enterprise", "Web", "Mobile", "AI"];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
    const [expandedProject, setExpandedProject] = useState<number | null>(null);

    const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="section-padding">
            <div className="container-width">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block underline decoration-2 underline-offset-4">
                        Portfolio
                    </span>
                    <h2 className="text-5xl font-black tracking-tighter">
                        Selected <span className="text-muted/30 italic">Works.</span>
                    </h2>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2 mb-14"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setExpandedProject(null);
                            }}
                            className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                                    ? "bg-accent text-background border-accent"
                                    : "bg-transparent border-border text-muted hover:border-accent/40 hover:text-foreground"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="group relative"
                            >
                                <div
                                    className={`relative p-10 rounded-[2.5rem] border border-border bg-card/10 hover:bg-card/30 transition-all duration-500 overflow-hidden h-full flex flex-col`}
                                >
                                    {/* Background gradient */}
                                    <div
                                        className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${project.accent} blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                                    />

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                                    <Layers size={18} className="text-accent" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                {project.links?.github && (
                                                    <a
                                                        href={project.links.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-xl bg-border/20 hover:bg-accent hover:text-background transition-all"
                                                        aria-label={`View ${project.title} on GitHub`}
                                                    >
                                                        <Github size={16} />
                                                    </a>
                                                )}
                                                {project.links?.live && (
                                                    <a
                                                        href={project.links.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-xl bg-border/20 hover:bg-accent hover:text-background transition-all"
                                                        aria-label={`View ${project.title} live demo`}
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-bold mb-3 tracking-tight">{project.title}</h3>
                                        <p className="text-foreground/60 mb-6 leading-relaxed font-medium text-[15px]">
                                            {expandedProject === i ? project.longDescription : project.description}
                                        </p>

                                        {/* Highlights */}
                                        <AnimatePresence>
                                            {expandedProject === i && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mb-6 overflow-hidden"
                                                >
                                                    <div className="flex flex-col gap-2">
                                                        {project.highlights.map((h) => (
                                                            <div key={h} className="flex items-center gap-2 text-sm text-foreground/50">
                                                                <ChevronRight size={14} className="text-accent" />
                                                                <span>{h}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Footer */}
                                        <div className="mt-auto pt-6 flex flex-col gap-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 rounded-full bg-border/30 text-[10px] font-black uppercase tracking-widest text-muted"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                                                className="text-[11px] font-black uppercase tracking-widest text-accent hover:underline self-start flex items-center gap-1"
                                            >
                                                {expandedProject === i ? "Show less" : "Learn more"}
                                                <ChevronRight
                                                    size={12}
                                                    className={`transition-transform duration-300 ${expandedProject === i ? "rotate-90" : ""}`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
