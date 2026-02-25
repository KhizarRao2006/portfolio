"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Send, Loader2, CheckCircle2, Save, Plus, Trash2, ArrowLeft, LogOut, ShieldCheck, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import type { SiteContent, ExperienceItem, SkillGroup, ProjectItem, EducationItem } from "@/lib/content";

// ============================================================
// Section tabs
// ============================================================
const tabs = ["Visibility", "Hero", "About", "Experience", "Skills", "Projects", "Education", "Contact"] as const;
type Tab = (typeof tabs)[number];

// ============================================================
// Main Edit Page
// ============================================================
export default function EditPage() {
    const [authState, setAuthState] = useState<"loading" | "unauthenticated" | "otp-sent" | "authenticated">("loading");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);

    // Content state
    const [content, setContent] = useState<SiteContent | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("Visibility");
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    // Check auth on mount
    useEffect(() => {
        fetch("/api/auth/check")
            .then((r) => r.json())
            .then((data) => {
                if (data.authenticated) {
                    setAuthState("authenticated");
                    loadContent();
                } else {
                    setAuthState("unauthenticated");
                }
            })
            .catch(() => setAuthState("unauthenticated"));
    }, []);

    const loadContent = async () => {
        const res = await fetch("/api/content");
        const data = await res.json();
        setContent(data);
    };

    const sendOtp = async () => {
        setSending(true);
        setError("");
        try {
            const res = await fetch("/api/auth/send-otp", { method: "POST" });
            const data = await res.json();
            if (data.success) {
                setAuthState("otp-sent");
            } else {
                setError(data.message);
            }
        } catch {
            setError("Network error. Try again.");
        }
        setSending(false);
    };

    const verifyOtp = async () => {
        setVerifying(true);
        setError("");
        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp }),
            });
            const data = await res.json();
            if (data.success) {
                setAuthState("authenticated");
                loadContent();
            } else {
                setError(data.message);
            }
        } catch {
            setError("Network error. Try again.");
        }
        setVerifying(false);
    };

    const saveContent = async () => {
        if (!content) return;
        setSaving(true);
        setSaveMessage("");
        try {
            const res = await fetch("/api/content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });
            const data = await res.json();
            setSaveMessage(data.success ? "Saved successfully!" : data.message);
        } catch {
            setSaveMessage("Failed to save. Try again.");
        }
        setSaving(false);
        setTimeout(() => setSaveMessage(""), 3000);
    };

    // ============================================================
    // Auth UI
    // ============================================================
    if (authState === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    if (authState === "unauthenticated" || authState === "otp-sent") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md p-12 rounded-[3rem] border border-border bg-card/20 text-center"
                >
                    <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-accent/10 flex items-center justify-center">
                        <Lock size={28} className="text-accent" />
                    </div>

                    {authState === "unauthenticated" ? (
                        <>
                            <h1 className="text-3xl font-black tracking-tight mb-3">Admin Access</h1>
                            <p className="text-muted text-sm mb-10 leading-relaxed">
                                A one-time code will be sent to your registered email to verify your identity.
                            </p>
                            <button
                                onClick={sendOtp}
                                disabled={sending}
                                className="w-full py-4 rounded-2xl bg-accent text-background font-bold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all uppercase tracking-widest"
                            >
                                {sending ? (
                                    <>
                                        Sending... <Loader2 size={18} className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Request OTP <Send size={18} />
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-black tracking-tight mb-3">Enter Code</h1>
                            <p className="text-muted text-sm mb-8 leading-relaxed">
                                Check your email for the 6-digit verification code.
                            </p>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                placeholder="000000"
                                className="w-full px-6 py-5 rounded-2xl border border-border bg-background text-center text-3xl font-mono tracking-[0.5em] focus:border-accent outline-none transition-colors mb-6"
                                autoFocus
                            />
                            <button
                                onClick={verifyOtp}
                                disabled={verifying || otp.length !== 6}
                                className="w-full py-4 rounded-2xl bg-accent text-background font-bold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all uppercase tracking-widest"
                            >
                                {verifying ? (
                                    <>
                                        Verifying... <Loader2 size={18} className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Verify <CheckCircle2 size={18} />
                                    </>
                                )}
                            </button>
                            <button onClick={() => setAuthState("unauthenticated")} className="mt-4 text-muted text-xs hover:text-accent transition-colors">
                                Resend code
                            </button>
                        </>
                    )}

                    {error && <p className="text-red-400 text-sm mt-4 font-medium">{error}</p>}

                    <Link href="/" className="inline-flex items-center gap-2 mt-8 text-muted text-xs hover:text-accent transition-colors">
                        <ArrowLeft size={14} /> Back to portfolio
                    </Link>
                </motion.div>
            </div>
        );
    }

    // ============================================================
    // Editor UI
    // ============================================================
    if (!content) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
                            <ArrowLeft size={18} />
                            <span className="text-[11px] font-black uppercase tracking-widest">Portfolio</span>
                        </Link>
                        <div className="w-px h-6 bg-border" />
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-accent" />
                            <span className="text-[11px] font-black uppercase tracking-widest text-accent">Edit Mode</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <AnimatePresence>
                            {saveMessage && (
                                <motion.span
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs font-bold text-accent"
                                >
                                    {saveMessage}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={saveContent}
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-accent text-background text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 disabled:opacity-50 transition-all"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                            Save All
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-20 max-w-5xl mx-auto px-6 pb-20">
                {/* Tab Bar */}
                <div className="flex flex-wrap gap-2 mb-12 sticky top-[73px] bg-background/90 backdrop-blur-md py-4 z-40 -mx-2 px-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${activeTab === tab
                                ? "bg-accent text-background border-accent"
                                : "bg-transparent border-border text-muted hover:border-accent/40 hover:text-foreground"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Section Editors */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                        {activeTab === "Visibility" && <VisibilityEditor content={content} setContent={setContent} />}
                        {activeTab === "Hero" && <HeroEditor content={content} setContent={setContent} />}
                        {activeTab === "About" && <AboutEditor content={content} setContent={setContent} />}
                        {activeTab === "Experience" && <ExperienceEditor content={content} setContent={setContent} />}
                        {activeTab === "Skills" && <SkillsEditor content={content} setContent={setContent} />}
                        {activeTab === "Projects" && <ProjectsEditor content={content} setContent={setContent} />}
                        {activeTab === "Education" && <EducationEditor content={content} setContent={setContent} />}
                        {activeTab === "Contact" && <ContactEditor content={content} setContent={setContent} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// ============================================================
// Shared helpers
// ============================================================
interface EditorProps {
    content: SiteContent;
    setContent: React.Dispatch<React.SetStateAction<SiteContent | null>>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl font-black tracking-tight mb-8">{children}</h2>;
}

function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2">{children}</label>;
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-5 py-3 rounded-xl border border-border bg-card/10 focus:border-accent outline-none font-medium transition-colors text-sm"
        />
    );
}

function TextArea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-5 py-3 rounded-xl border border-border bg-card/10 focus:border-accent outline-none font-medium resize-none transition-colors text-sm"
        />
    );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-8 rounded-2xl border border-border bg-card/5 ${className}`}>{children}</div>;
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-dashed border-accent/30 text-accent text-[11px] font-black uppercase tracking-widest hover:bg-accent/5 transition-all"
        >
            <Plus size={14} /> {label}
        </button>
    );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-all" title="Remove">
            <Trash2 size={16} />
        </button>
    );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${checked
                    ? "border-accent/40 bg-accent/5"
                    : "border-border bg-card/5 opacity-60"
                }`}
        >
            <div className="flex items-center gap-3">
                {checked ? (
                    <Eye size={18} className="text-accent" />
                ) : (
                    <EyeOff size={18} className="text-muted" />
                )}
                <span className="text-sm font-bold">{label}</span>
            </div>
            <div
                className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${checked ? "bg-accent" : "bg-border"
                    }`}
            >
                <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-background shadow-sm transition-transform duration-300 ${checked ? "translate-x-[22px]" : "translate-x-0.5"
                        }`}
                />
            </div>
        </button>
    );
}

// ============================================================
// Visibility Editor
// ============================================================
function VisibilityEditor({ content, setContent }: EditorProps) {
    const vis = content.visibility || { hero: true, about: true, experience: true, skills: true, projects: true, education: true, contact: true };
    const update = (key: string, value: boolean) =>
        setContent((prev) => prev && { ...prev, visibility: { ...vis, [key]: value } });

    const sections = [
        { key: "hero", label: "Hero Section" },
        { key: "about", label: "About Section" },
        { key: "experience", label: "Experience Section" },
        { key: "skills", label: "Skills Section" },
        { key: "projects", label: "Projects Section" },
        { key: "education", label: "Education Section" },
        { key: "contact", label: "Contact Section" },
    ];

    return (
        <div className="space-y-8">
            <SectionTitle>Section Visibility</SectionTitle>
            <p className="text-muted text-sm font-medium -mt-4 mb-4">Toggle sections on or off. Disabled sections will be hidden from the live site.</p>
            <Card>
                <div className="space-y-3">
                    {sections.map((s) => (
                        <Toggle
                            key={s.key}
                            checked={vis[s.key as keyof typeof vis] ?? true}
                            onChange={(v) => update(s.key, v)}
                            label={s.label}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
}

// ============================================================
// Hero Editor
// ============================================================
function HeroEditor({ content, setContent }: EditorProps) {
    const hero = content.hero;
    const update = (patch: Partial<typeof hero>) => setContent((prev) => prev && { ...prev, hero: { ...prev.hero, ...patch } });

    return (
        <div className="space-y-8">
            <SectionTitle>Hero Section</SectionTitle>

            <Card>
                <Label>Status Badge</Label>
                <Input value={hero.badge} onChange={(v) => update({ badge: v })} />
            </Card>

            <Card>
                <Label>Scramble Phrases (one per line)</Label>
                <TextArea
                    value={hero.scramblePhrases.join("\n")}
                    onChange={(v) => update({ scramblePhrases: v.split("\n").filter(Boolean) })}
                    rows={4}
                    placeholder="Excellence&#10;Scalability&#10;Precision"
                />
            </Card>

            <Card>
                <Label>Description</Label>
                <TextArea value={hero.description} onChange={(v) => update({ description: v })} rows={3} />
            </Card>

            <Card>
                <Label>Stats</Label>
                <div className="space-y-4">
                    {hero.stats.map((stat, i) => (
                        <div key={i} className="flex gap-3 items-center">
                            <Input value={stat.value} onChange={(v) => {
                                const stats = [...hero.stats];
                                stats[i] = { ...stats[i], value: v };
                                update({ stats });
                            }} placeholder="Value" />
                            <Input value={stat.label} onChange={(v) => {
                                const stats = [...hero.stats];
                                stats[i] = { ...stats[i], label: v };
                                update({ stats });
                            }} placeholder="Label" />
                            <RemoveButton onClick={() => {
                                const stats = hero.stats.filter((_, idx) => idx !== i);
                                update({ stats });
                            }} />
                        </div>
                    ))}
                    <AddButton onClick={() => update({ stats: [...hero.stats, { value: "", label: "" }] })} label="Add Stat" />
                </div>
            </Card>
        </div>
    );
}

// ============================================================
// About Editor
// ============================================================
function AboutEditor({ content, setContent }: EditorProps) {
    const about = content.about;
    const update = (patch: Partial<typeof about>) => setContent((prev) => prev && { ...prev, about: { ...prev.about, ...patch } });

    return (
        <div className="space-y-8">
            <SectionTitle>About Section</SectionTitle>

            <Card>
                <div className="space-y-4">
                    <div>
                        <Label>Section Label</Label>
                        <Input value={about.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
                    </div>
                    <div>
                        <Label>Heading</Label>
                        <Input value={about.heading} onChange={(v) => update({ heading: v })} />
                    </div>
                    <div>
                        <Label>Subheading</Label>
                        <Input value={about.subheading} onChange={(v) => update({ subheading: v })} />
                    </div>
                </div>
            </Card>

            <Card>
                <Label>Paragraphs</Label>
                <div className="space-y-4">
                    {about.paragraphs.map((p, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <TextArea value={p} onChange={(v) => {
                                const paragraphs = [...about.paragraphs];
                                paragraphs[i] = v;
                                update({ paragraphs });
                            }} rows={3} />
                            <RemoveButton onClick={() => update({ paragraphs: about.paragraphs.filter((_, idx) => idx !== i) })} />
                        </div>
                    ))}
                    <AddButton onClick={() => update({ paragraphs: [...about.paragraphs, ""] })} label="Add Paragraph" />
                </div>
            </Card>

            <Card>
                <Label>Info Cards</Label>
                <div className="space-y-6">
                    {about.cards.map((card, i) => (
                        <div key={i} className="p-4 rounded-xl border border-border/50 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-muted">Card {i + 1}</span>
                                <RemoveButton onClick={() => update({ cards: about.cards.filter((_, idx) => idx !== i) })} />
                            </div>
                            <Input value={card.title} onChange={(v) => {
                                const cards = [...about.cards];
                                cards[i] = { ...cards[i], title: v };
                                update({ cards });
                            }} placeholder="Title" />
                            <TextArea value={card.description} onChange={(v) => {
                                const cards = [...about.cards];
                                cards[i] = { ...cards[i], description: v };
                                update({ cards });
                            }} placeholder="Description" rows={2} />
                        </div>
                    ))}
                    <AddButton onClick={() => update({ cards: [...about.cards, { title: "", description: "" }] })} label="Add Card" />
                </div>
            </Card>
        </div>
    );
}

// ============================================================
// Experience Editor
// ============================================================
function ExperienceEditor({ content, setContent }: EditorProps) {
    const items = content.experience;
    const update = (experience: ExperienceItem[]) => setContent((prev) => prev && { ...prev, experience });

    return (
        <div className="space-y-8">
            <SectionTitle>Experience</SectionTitle>
            {items.map((exp, i) => (
                <Card key={i}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-accent uppercase tracking-widest">Position {i + 1}</span>
                        <RemoveButton onClick={() => update(items.filter((_, idx) => idx !== i))} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>Company</Label>
                            <Input value={exp.company} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], company: v }; update(copy); }} />
                        </div>
                        <div>
                            <Label>Role</Label>
                            <Input value={exp.role} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], role: v }; update(copy); }} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <Label>Period</Label>
                        <Input value={exp.period} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], period: v }; update(copy); }} placeholder="Oct 2024 — Present" />
                    </div>
                    <div className="mb-4">
                        <Label>Description</Label>
                        <TextArea value={exp.desc} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], desc: v }; update(copy); }} rows={2} />
                    </div>
                    <div>
                        <Label>Tags (comma separated)</Label>
                        <Input value={exp.tags.join(", ")} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], tags: v.split(",").map((t) => t.trim()).filter(Boolean) }; update(copy); }} placeholder="PHP, Laravel, Django" />
                    </div>
                </Card>
            ))}
            <AddButton onClick={() => update([...items, { company: "", role: "", period: "", desc: "", tags: [] }])} label="Add Experience" />
        </div>
    );
}

// ============================================================
// Skills Editor
// ============================================================
function SkillsEditor({ content, setContent }: EditorProps) {
    const groups = content.skills;
    const update = (skills: SkillGroup[]) => setContent((prev) => prev && { ...prev, skills });

    const iconOptions = ["cpu", "layout", "database", "smartphone", "git-branch", "shield"];

    return (
        <div className="space-y-8">
            <SectionTitle>Skills</SectionTitle>
            {groups.map((group, i) => (
                <Card key={i}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-accent uppercase tracking-widest">Group {i + 1}</span>
                        <RemoveButton onClick={() => update(groups.filter((_, idx) => idx !== i))} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>Title</Label>
                            <Input value={group.title} onChange={(v) => { const copy = [...groups]; copy[i] = { ...copy[i], title: v }; update(copy); }} />
                        </div>
                        <div>
                            <Label>Icon</Label>
                            <select
                                value={group.icon}
                                onChange={(e) => { const copy = [...groups]; copy[i] = { ...copy[i], icon: e.target.value }; update(copy); }}
                                className="w-full px-5 py-3 rounded-xl border border-border bg-card/10 focus:border-accent outline-none font-medium transition-colors text-sm"
                            >
                                {iconOptions.map((icon) => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <Label>Skills (comma separated)</Label>
                        <Input value={group.skills.join(", ")} onChange={(v) => { const copy = [...groups]; copy[i] = { ...copy[i], skills: v.split(",").map((s) => s.trim()).filter(Boolean) }; update(copy); }} />
                    </div>
                </Card>
            ))}
            <AddButton onClick={() => update([...groups, { title: "", icon: "cpu", skills: [] }])} label="Add Skill Group" />
        </div>
    );
}

// ============================================================
// Projects Editor
// ============================================================
function ProjectsEditor({ content, setContent }: EditorProps) {
    const items = content.projects;
    const update = (projects: ProjectItem[]) => setContent((prev) => prev && { ...prev, projects });

    const accentOptions = [
        "from-blue-500/20 to-cyan-500/20",
        "from-amber-500/20 to-orange-500/20",
        "from-emerald-500/20 to-green-500/20",
        "from-violet-500/20 to-purple-500/20",
        "from-rose-500/20 to-pink-500/20",
        "from-sky-500/20 to-indigo-500/20",
    ];

    return (
        <div className="space-y-8">
            <SectionTitle>Projects</SectionTitle>
            {items.map((proj, i) => (
                <Card key={i}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-accent uppercase tracking-widest">Project {i + 1}</span>
                        <RemoveButton onClick={() => update(items.filter((_, idx) => idx !== i))} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>Title</Label>
                            <Input value={proj.title} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], title: v }; update(copy); }} />
                        </div>
                        <div>
                            <Label>Category</Label>
                            <Input value={proj.category} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], category: v }; update(copy); }} placeholder="Enterprise / Web / Mobile / AI" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <Label>Short Description</Label>
                        <TextArea value={proj.description} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], description: v }; update(copy); }} rows={2} />
                    </div>
                    <div className="mb-4">
                        <Label>Full Description</Label>
                        <TextArea value={proj.longDescription} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], longDescription: v }; update(copy); }} rows={3} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>Tags (comma separated)</Label>
                            <Input value={proj.tags.join(", ")} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], tags: v.split(",").map((t) => t.trim()).filter(Boolean) }; update(copy); }} />
                        </div>
                        <div>
                            <Label>Highlights (comma separated)</Label>
                            <Input value={proj.highlights.join(", ")} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], highlights: v.split(",").map((h) => h.trim()).filter(Boolean) }; update(copy); }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>GitHub URL (optional)</Label>
                            <Input value={proj.links?.github || ""} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], links: { ...copy[i].links, github: v || undefined } }; update(copy); }} />
                        </div>
                        <div>
                            <Label>Live URL (optional)</Label>
                            <Input value={proj.links?.live || ""} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], links: { ...copy[i].links, live: v || undefined } }; update(copy); }} />
                        </div>
                    </div>
                    <div>
                        <Label>Accent Color</Label>
                        <select
                            value={proj.accent}
                            onChange={(e) => { const copy = [...items]; copy[i] = { ...copy[i], accent: e.target.value }; update(copy); }}
                            className="w-full px-5 py-3 rounded-xl border border-border bg-card/10 focus:border-accent outline-none font-medium transition-colors text-sm"
                        >
                            {accentOptions.map((a) => (
                                <option key={a} value={a}>{a.replace(/from-|\/20| to-/g, " ").trim()}</option>
                            ))}
                        </select>
                    </div>
                </Card>
            ))}
            <AddButton onClick={() => update([...items, { title: "", description: "", longDescription: "", tags: [], category: "Web", accent: accentOptions[0], highlights: [] }])} label="Add Project" />
        </div>
    );
}

// ============================================================
// Education Editor
// ============================================================
function EducationEditor({ content, setContent }: EditorProps) {
    const items = content.education;
    const update = (education: EducationItem[]) => setContent((prev) => prev && { ...prev, education });

    const iconOptions = ["graduation-cap", "book-open", "award"];

    return (
        <div className="space-y-8">
            <SectionTitle>Education</SectionTitle>
            {items.map((edu, i) => (
                <Card key={i}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-accent uppercase tracking-widest">Entry {i + 1}</span>
                        <RemoveButton onClick={() => update(items.filter((_, idx) => idx !== i))} />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Label>Degree / Program</Label>
                            <Input value={edu.degree} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], degree: v }; update(copy); }} />
                        </div>
                        <div>
                            <Label>Institution</Label>
                            <Input value={edu.institution} onChange={(v) => { const copy = [...items]; copy[i] = { ...copy[i], institution: v }; update(copy); }} />
                        </div>
                        <div>
                            <Label>Icon</Label>
                            <select
                                value={edu.icon}
                                onChange={(e) => { const copy = [...items]; copy[i] = { ...copy[i], icon: e.target.value }; update(copy); }}
                                className="w-full px-5 py-3 rounded-xl border border-border bg-card/10 focus:border-accent outline-none font-medium transition-colors text-sm"
                            >
                                {iconOptions.map((icon) => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Card>
            ))}
            <AddButton onClick={() => update([...items, { institution: "", degree: "", icon: "graduation-cap" }])} label="Add Education" />
        </div>
    );
}

// ============================================================
// Contact Editor
// ============================================================
function ContactEditor({ content, setContent }: EditorProps) {
    const contact = content.contact;
    const update = (patch: Partial<typeof contact>) => setContent((prev) => prev && { ...prev, contact: { ...prev.contact, ...patch } });

    return (
        <div className="space-y-8">
            <SectionTitle>Contact</SectionTitle>

            <Card>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label>Phone</Label>
                        <Input value={contact.phone} onChange={(v) => update({ phone: v })} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input value={contact.email} onChange={(v) => update({ email: v })} />
                    </div>
                </div>
                <div className="mb-4">
                    <Label>Form Heading</Label>
                    <Input value={contact.formHeading} onChange={(v) => update({ formHeading: v })} />
                </div>
                <div>
                    <Label>Form Quote</Label>
                    <TextArea value={contact.formQuote} onChange={(v) => update({ formQuote: v })} rows={2} />
                </div>
            </Card>

            <Card>
                <Label>Social Links</Label>
                <div className="space-y-4">
                    {contact.socialLinks.map((link, i) => (
                        <div key={i} className="flex gap-3 items-center">
                            <Input value={link.platform} onChange={(v) => {
                                const socialLinks = [...contact.socialLinks];
                                socialLinks[i] = { ...socialLinks[i], platform: v };
                                update({ socialLinks });
                            }} placeholder="Platform (linkedin, github...)" />
                            <Input value={link.url} onChange={(v) => {
                                const socialLinks = [...contact.socialLinks];
                                socialLinks[i] = { ...socialLinks[i], url: v };
                                update({ socialLinks });
                            }} placeholder="URL" />
                            <RemoveButton onClick={() => update({ socialLinks: contact.socialLinks.filter((_, idx) => idx !== i) })} />
                        </div>
                    ))}
                    <AddButton onClick={() => update({ socialLinks: [...contact.socialLinks, { platform: "", url: "" }] })} label="Add Social Link" />
                </div>
            </Card>
        </div>
    );
}
