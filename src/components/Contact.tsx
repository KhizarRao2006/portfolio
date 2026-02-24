"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            // Using Formspree (Automation for static/serverless portfolios)
            const response = await fetch("https://formspree.io/f/mpqjovvz", {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                    _subject: `Portfolio Inquiry: ${data.name}`,
                    _replyto: data.email
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="section-padding bg-foreground text-background">
            <div className="container-width">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-none"
                        >
                            Let&apos;s build <br />
                            <span className="text-background/40 italic">the future.</span>
                        </motion.h2>

                        <div className="space-y-8 mb-12">
                            <div className="flex flex-col gap-2">
                                <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Direct Connection</span>
                                <a href="tel:+923053630364" className="text-4xl font-light hover:text-accent transition-all">+92 305 3630364</a>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Written Correspondence</span>
                                <a href="mailto:Khizarraoworks@gmail.com" className="text-4xl font-light hover:text-accent transition-all break-all">Khizarraoworks@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/in/khizar-rao" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-background/5 flex items-center justify-center hover:bg-accent hover:text-background transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/khizarrao2006" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-background/5 flex items-center justify-center hover:bg-accent hover:text-background transition-all">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-[3.5rem] bg-background text-foreground shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center"
                    >
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center px-4"
                            >
                                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-accent" />
                                </div>
                                <h3 className="text-3xl font-black mb-4">Transmission Sent</h3>
                                <p className="text-muted/60 font-medium max-w-xs">
                                    Your message has been received. I will review and respond shortly.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-10 text-sm font-bold uppercase tracking-widest text-accent hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <div className="w-full">
                                <h3 className="text-2xl font-bold mb-8">Secure Your Infrastructure</h3>
                                <p className="text-muted/60 mb-10 font-medium italic">
                                    &quot;I am currently available for senior roles and high-impact enterprise consultations.&quot;
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            required
                                            className="w-full px-6 py-4 rounded-2xl border border-border bg-card/5 focus:border-accent outline-none font-medium transition-colors"
                                        />
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            required
                                            className="w-full px-6 py-4 rounded-2xl border border-border bg-card/5 focus:border-accent outline-none font-medium transition-colors"
                                        />
                                    </div>
                                    <textarea
                                        name="message"
                                        placeholder="Tell me about your project..."
                                        rows={4}
                                        required
                                        className="w-full px-6 py-4 rounded-2xl border border-border bg-card/5 focus:border-accent outline-none font-medium resize-none transition-colors"
                                    />
                                    <button
                                        disabled={status === "loading"}
                                        className="w-full py-5 rounded-2xl bg-accent text-background font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all"
                                    >
                                        {status === "loading" ? (
                                            <>Processing... <Loader2 size={20} className="animate-spin" /></>
                                        ) : (
                                            <>Initiate Conversation <Send size={20} /></>
                                        )}
                                    </button>

                                    {status === "error" && (
                                        <p className="text-red-500 text-sm font-bold text-center mt-4">
                                            There was an error. Please email directly.
                                        </p>
                                    )}
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
