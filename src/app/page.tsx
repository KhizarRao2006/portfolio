import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SettingsManager from "@/components/SettingsManager";
import { getDb } from "@/lib/firebase-admin";
import { defaultContent, type SiteContent } from "@/lib/content";

export const dynamic = 'force-dynamic';

async function getContent(): Promise<SiteContent> {
    try {
        const db = getDb();
        if (!db) return defaultContent;

        const doc = await db.collection("content").doc("site").get();
        if (!doc.exists) return defaultContent;

        const data = doc.data() || {};
        return {
            ...defaultContent,
            ...data,
            visibility: { ...defaultContent.visibility, ...(data.visibility || {}) },
            appearance: { ...defaultContent.appearance, ...(data.appearance || {}) },
            resume: { ...defaultContent.resume, ...(data.resume || {}) },
            resumes: data.resumes || defaultContent.resumes,
            legal: { ...defaultContent.legal, ...(data.legal || {}) },
            privacy: { ...defaultContent.privacy, ...(data.privacy || {}) }
        } as SiteContent;
    } catch {
        return defaultContent;
    }
}

export default async function Home() {
    const content = await getContent();
    const vis = content.visibility || { hero: true, about: true, experience: true, skills: true, projects: true, education: true, contact: true };

    return (
        <main className="min-h-screen">
            <Navbar />
            <SettingsManager defaults={content.appearance} resumeUrl={content.resume?.url} />
            {vis.hero && <Hero content={content.hero} resumes={content.resumes} />}
            {vis.about && <About content={content.about} />}
            {vis.experience && <Experience content={content.experience} />}
            {vis.skills && <Skills content={content.skills} />}
            {vis.projects && <Projects content={content.projects} />}
            {vis.education && <Education content={content.education} />}
            {vis.contact && <Contact content={content.contact} />}
            <Footer />
        </main>
    );
}
