"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // IntersectionObserver for active section tracking
        const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
        const observers: IntersectionObserver[] = [];

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        });

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        observers.push(observer);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observers.forEach((obs) => obs.disconnect());
        };
    }, []);

    if (!mounted) return null;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? "bg-background/80 backdrop-blur-md py-4 border-b border-border" : "bg-transparent py-8"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <span className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-background text-sm">K</span>
                    KHIZAR RAO
                </Link>

                {/* Desktop Navigation */}
                <div ref={navRef} className="hidden md:flex items-center gap-8 relative">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace("#", "");
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors duration-300 ${isActive ? "text-accent" : "text-foreground/60 hover:text-foreground"
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-accent rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-muted/10 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-muted/10 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1" aria-label="Toggle menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl px-6 py-8 flex flex-col gap-6"
                    >
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-medium transition-colors flex items-center gap-3 ${isActive ? "text-accent" : "hover:text-accent"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavMobile"
                                            className="w-1.5 h-1.5 rounded-full bg-accent"
                                        />
                                    )}
                                    {link.name}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
