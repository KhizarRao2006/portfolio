import Link from "next/link";
import type { Metadata } from "next";
import { getDb } from "@/lib/firebase-admin";
import { defaultContent } from "@/lib/content";

export const metadata: Metadata = {
    title: "Privacy Policy | Khizar Rao",
    description: "Privacy policy for Khizar Rao's portfolio website.",
};

export const dynamic = 'force-dynamic';

async function getPrivacyContent() {
    try {
        const db = getDb();
        if (!db) return defaultContent.privacy;
        const doc = await db.collection("content").doc("site").get();
        if (!doc.exists) return defaultContent.privacy;
        return (doc.data()?.privacy || defaultContent.privacy);
    } catch {
        return defaultContent.privacy;
    }
}

export default async function PrivacyPage() {
    const privacy = await getPrivacyContent();

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-6 py-32">
                <Link
                    href="/"
                    className="text-accent text-[11px] font-black uppercase tracking-widest hover:underline mb-12 inline-block"
                >
                    ← Back to Portfolio
                </Link>

                <h1 className="text-5xl font-black tracking-tighter mb-4">{privacy.title}</h1>
                <p className="text-muted text-sm font-bold uppercase tracking-widest mb-16">
                    Last Updated: {privacy.lastUpdated}
                </p>

                <div className="space-y-12 text-foreground/70 leading-relaxed font-medium">
                    {privacy.sections.map((section: any, idx: number) => (
                        <section key={idx}>
                            <h2 className="text-xl font-bold text-foreground mb-4">{section.heading}</h2>
                            <p className="whitespace-pre-wrap">{section.content}</p>
                        </section>
                    ))}

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Contact</h2>
                        <p>
                            If you have questions about this privacy policy, please contact me at{" "}
                            <a
                                href="mailto:Khizarraoworks@gmail.com"
                                className="text-accent hover:underline"
                            >
                                Khizarraoworks@gmail.com
                            </a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
