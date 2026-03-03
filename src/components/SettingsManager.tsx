"use client";

import { useState, useEffect } from "react";
import { Settings2, X, Sun, Moon, Palette, MousePointer2, Sparkles, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import type { AppearanceSettings } from "@/lib/content";

interface SettingsManagerProps {
    defaults: AppearanceSettings;
    resumeUrl?: string;
}

export default function SettingsManager({ defaults, resumeUrl }: SettingsManagerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Safety fallback
    const safeDefaults: AppearanceSettings = {
        cursorStyle: defaults?.cursorStyle || "glow",
        accentColor: defaults?.accentColor || "#D4AF37",
        enableGrain: defaults?.enableGrain ?? true,
        disabledCursorStyles: defaults?.disabledCursorStyles || []
    };

    const disabledStyles = safeDefaults.disabledCursorStyles;
    const [settings, setSettings] = useState<AppearanceSettings>(safeDefaults);

    // Initial load for both settings and visibility
    useEffect(() => {
        setIsMounted(true);
        const hidden = localStorage.getItem("hide-customizer") === "true";
        setIsHidden(hidden);

        const saved = localStorage.getItem("user-settings");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSettings({ ...safeDefaults, ...parsed });
            } catch (e) {
                console.error("Failed to load settings", e);
            }
        }
    }, [defaults]);

    // Apply settings to document
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--accent", settings.accentColor);
        localStorage.setItem("user-settings", JSON.stringify(settings));

        // Dispatch custom event for cursor
        window.dispatchEvent(new CustomEvent("settings-changed", { detail: settings }));
    }, [settings]);

    const toggleVisibility = (e: React.MouseEvent) => {
        e.stopPropagation();
        const next = !isHidden;
        setIsHidden(next);
        localStorage.setItem("hide-customizer", String(next));
    };

    if (!isMounted) return null;

    if (isHidden && !isOpen) return (
        <button
            onClick={() => setIsHidden(false)}
            className="fixed bottom-6 right-24 z-50 w-8 h-8 rounded-full bg-background/50 blur-backdrop border border-border flex items-center justify-center text-muted hover:text-accent transition-colors"
            title="Restore Customizer"
        >
            <Settings2 size={14} />
        </button>
    );

    return (
        <>
            {/* Floating Tag */}
            <motion.div
                className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-end gap-2"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
            >
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-background/80 blur-backdrop border-l border-t border-b border-border p-3 pl-4 rounded-l-2xl shadow-2xl hover:bg-accent/10 transition-colors group flex items-center gap-3"
                    whileHover={{ x: -4 }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {isOpen ? <X size={24} className="text-accent" /> : <Settings2 size={24} className="text-accent" />}
                    </motion.div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-accent transition-colors [writing-mode:vertical-lr] rotate-180">
                        {isOpen ? "Close" : "Customize"}
                    </span>
                </motion.button>

                {!isOpen && (
                    <button
                        onClick={toggleVisibility}
                        className="mr-2 p-1.5 rounded-full bg-background/50 border border-border text-muted hover:text-red-500 transition-colors"
                        title="Hide Button"
                    >
                        <X size={12} />
                    </button>
                )}
            </motion.div>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[70]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            className="fixed right-0 top-0 bottom-0 w-80 bg-background border-l border-border z-[80] p-8 shadow-2xl overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                                    <Sparkles size={20} className="text-accent" />
                                    Visuals
                                </h2>
                                <button onClick={() => setIsOpen(false)} className="text-muted hover:text-foreground">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-10">
                                {/* Theme */}
                                <section>
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-muted mb-4 flex items-center gap-2">
                                        <Palette size={14} /> Mode
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setTheme("dark")}
                                            className={`py-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${theme === "dark" ? "bg-accent text-background border-accent" : "border-border hover:border-accent/40"}`}
                                        >
                                            <Moon size={14} /> Dark
                                        </button>
                                        <button
                                            onClick={() => setTheme("light")}
                                            className={`py-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${theme === "light" ? "bg-accent text-background border-accent" : "border-border hover:border-accent/40"}`}
                                        >
                                            <Sun size={14} /> Light
                                        </button>
                                    </div>
                                </section>

                                {/* Accent Color */}
                                <section>
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-muted mb-4">Accent Color</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["#D4AF37", "#3B82F6", "#EC4899", "#10B981", "#8B5CF6"].map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSettings({ ...settings, accentColor: color })}
                                                className={`w-10 h-10 rounded-full border-2 transition-all ${settings.accentColor === color ? "border-foreground scale-110" : "border-transparent"}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                        <div className="relative">
                                            <input
                                                type="color"
                                                value={settings.accentColor}
                                                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                                                className="w-10 h-10 rounded-full bg-transparent border-2 border-border cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Cursor Style */}
                                <section>
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-muted mb-4 flex items-center gap-2">
                                        <MousePointer2 size={14} /> Cursor Style
                                    </h3>
                                    <div className="grid grid-cols-3 gap-1.5 max-h-64 overflow-y-auto pr-1">
                                        {["default", "minimal", "glow", "ring", "inverter", "crosshair", "blade", "dotmatrix", "reticle", "vector", "axis", "eonpulse", "hologram", "cybertrail", "quantum", "plasma", "orbital", "impact", "flare", "ember", "shockwave", "phantom", "magnet", "gravity", "ripple", "elastic", "warp", "glitch", "shard", "hoverlift", "spotlight", "softfocus", "pulsefade", "snap", "drift", "blend", "adaptiveechosurge", "vortex", "arcradial", "spectragridlock", "caliper", "tracer", "pinpoint"]
                                            .filter(s => !disabledStyles.includes(s))
                                            .map((style) => (
                                                <button
                                                    key={style}
                                                    onClick={() => setSettings({ ...settings, cursorStyle: style as any })}
                                                    className={`py-1.5 px-2 rounded-lg border text-[8px] font-black uppercase tracking-wider transition-all ${settings.cursorStyle === style ? "bg-accent/10 border-accent text-accent" : "border-border hover:border-accent/40"}`}
                                                >
                                                    {style}
                                                </button>
                                            ))}
                                    </div>
                                </section>

                                {/* Grain */}
                                <section>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[11px] font-black uppercase tracking-widest text-muted">Film Grain</h3>
                                        <button
                                            onClick={() => setSettings({ ...settings, enableGrain: !settings.enableGrain })}
                                            className={`w-10 h-5 rounded-full transition-colors relative ${settings.enableGrain ? "bg-accent" : "bg-border"}`}
                                        >
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform ${settings.enableGrain ? "translate-x-5" : "translate-x-0.5"}`} />
                                        </button>
                                    </div>
                                </section>

                                {/* Quick Links */}
                                {resumeUrl && (
                                    <section className="pt-6 border-t border-border">
                                        <a
                                            href={resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                                        >
                                            <Download size={14} /> My Resume
                                        </a>
                                    </section>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Grain Overlay */}
            {settings.enableGrain && (
                <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] grain-bg" />
            )}
        </>
    );
}
