"use client";

import { motion } from "framer-motion";
import { Cpu, Layout, Database, Smartphone, GitBranch, Shield } from "lucide-react";

const skillGroups = [
    {
        title: "Backend",
        icon: <Cpu className="text-accent" />,
        skills: ["PHP (Laravel/Yii)", "Python (Django)", "C# (.NET)", "Node.js", "TypeScript", "REST APIs"]
    },
    {
        title: "Frontend",
        icon: <Layout className="text-accent" />,
        skills: ["React (Vite)", "Next.js", "Tailwind CSS", "Bootstrap", "JavaScript", "Framer Motion"]
    },
    {
        title: "DataLayer",
        icon: <Database className="text-accent" />,
        skills: ["SQL Server", "MySQL", "PostgreSQL", "Firebase Firestore", "SQLite"]
    },
    {
        title: "Mobile",
        icon: <Smartphone className="text-accent" />,
        skills: ["Flutter", "Dart", "Firebase Integration", "Logic Engines"]
    },
    {
        title: "DevOps",
        icon: <GitBranch className="text-accent" />,
        skills: ["Git", "GitHub/SVN", "Docker", "Legacy Maintenance"]
    },
    {
        title: "Enterprise",
        icon: <Shield className="text-accent" />,
        skills: ["ERP Systems", "CRM Architecture", "System Design", "Scalable Logic"]
    }
];

export default function Skills() {
    return (
        <section id="skills" className="section-padding bg-card/10">
            <div className="container-width">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Arsenals</span>
                    <h2 className="text-5xl font-black tracking-tighter">Technical Proficiency</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillGroups.map((group, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-[2.5rem] border border-border bg-background hover:bg-card/20 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                                    {group.icon}
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-widest">{group.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-xl border border-border bg-muted/5 text-[11px] font-bold text-foreground/70">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
