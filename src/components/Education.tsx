"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const education = [
    {
        institution: "Aptech Learning Pakistan",
        degree: "Higher Diploma in Software Engineering (HDSE)",
        icon: <GraduationCap size={24} className="text-accent" />,
    },
    {
        institution: "Jamia Millia Degree College",
        degree: "Intermediate (Computer Science)",
        icon: <BookOpen size={24} className="text-accent" />,
    },
    {
        institution: "Blue Moon Grammar School",
        degree: "Matriculation (Computer Science)",
        icon: <Award size={24} className="text-accent" />,
    },
];

export default function Education() {
    return (
        <section id="education" className="section-padding">
            <div className="container-width">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4 block underline decoration-2 underline-offset-4 mx-auto w-fit">Academic Path</span>
                    <h2 className="text-5xl font-black tracking-tighter">Education</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="p-12 rounded-[3rem] bg-card/10 border border-border flex flex-col items-center text-center transition-all duration-500"
                        >
                            <div className="mb-8 w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center">
                                {edu.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 tracking-tight">{edu.degree}</h3>
                            <p className="text-muted font-bold tracking-widest text-[11px] uppercase">{edu.institution}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
