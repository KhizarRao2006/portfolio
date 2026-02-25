import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legal | Khizar Rao",
    description: "Legal information and terms of use for Khizar Rao's portfolio website.",
};

export default function LegalPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-6 py-32">
                <Link
                    href="/"
                    className="text-accent text-[11px] font-black uppercase tracking-widest hover:underline mb-12 inline-block"
                >
                    ← Back to Portfolio
                </Link>

                <h1 className="text-5xl font-black tracking-tighter mb-4">Legal</h1>
                <p className="text-muted text-sm font-bold uppercase tracking-widest mb-16">
                    Terms & Disclaimers
                </p>

                <div className="space-y-12 text-foreground/70 leading-relaxed font-medium">
                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Terms of Use</h2>
                        <p>
                            By accessing this website, you agree to these terms. This website is a
                            personal portfolio and is intended for informational purposes only. The
                            content presented represents professional experience and capabilities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Intellectual Property</h2>
                        <p>
                            All content on this website including design, text, code, and visual
                            elements is owned by Khizar Rao unless otherwise stated. You may not
                            reproduce, distribute, or create derivative works from this content
                            without prior written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Project Descriptions</h2>
                        <p>
                            Project descriptions and case studies on this website reflect my
                            professional contributions. Confidential details belonging to employers
                            or clients have been omitted or generalized to respect non-disclosure
                            agreements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">External Links</h2>
                        <p>
                            This website may contain links to external websites. I am not responsible
                            for the content, privacy policies, or practices of third-party sites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Disclaimer</h2>
                        <p>
                            The projects and work showcased on this website are presented for
                            professional context only. Mentioning a company or client does not
                            imply endorsement. All information reflects my individual contributions
                            and is shared to demonstrate my skills and experience to potential
                            collaborators and employers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Contact</h2>
                        <p>
                            For any legal inquiries, please contact me at{" "}
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
