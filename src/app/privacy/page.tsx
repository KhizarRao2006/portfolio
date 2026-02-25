import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Khizar Rao",
    description: "Privacy policy for Khizar Rao's portfolio website.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-6 py-32">
                <Link
                    href="/"
                    className="text-accent text-[11px] font-black uppercase tracking-widest hover:underline mb-12 inline-block"
                >
                    ← Back to Portfolio
                </Link>

                <h1 className="text-5xl font-black tracking-tighter mb-4">Privacy Policy</h1>
                <p className="text-muted text-sm font-bold uppercase tracking-widest mb-16">
                    Last updated: February 2026
                </p>

                <div className="space-y-12 text-foreground/70 leading-relaxed font-medium">
                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Overview</h2>
                        <p>
                            This portfolio website is operated by Khizar Rao. This page informs you of
                            the policies regarding the collection, use, and disclosure of personal
                            data when you use this website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Data Collection</h2>
                        <p className="mb-4">
                            This website collects minimal data. The only personal information collected
                            is what you voluntarily provide through the contact form:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Your name</li>
                            <li>Your email address</li>
                            <li>Your message content</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">How Your Data Is Used</h2>
                        <p>
                            Information submitted through the contact form is used solely to respond
                            to your inquiry. Your data is not sold,
                            shared, or used for marketing purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Cookies & Analytics</h2>
                        <p>
                            This website does not use cookies for tracking. No third-party analytics
                            services are integrated. The website uses local storage only for theme
                            preference (light/dark mode).
                        </p>
                    </section>

                    {/* <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Third-Party Services</h2>
                        <p className="mb-4">This website uses the following third-party services:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Formspree</strong> — for contact form submissions</li>
                            <li><strong>Netlify</strong> — for hosting and deployment</li>
                            <li><strong>Google Fonts</strong> — for typography</li>
                        </ul>
                    </section> */}

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
