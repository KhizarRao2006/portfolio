import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-foreground text-background/40 border-t border-background/5">
            <div className="container-width flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-black tracking-tighter text-background">KR.</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Full-Stack Developer</p>
                </div>

                <div className="flex gap-10">
                    <Link href="/privacy" className="hover:text-accent transition-colors text-[10px] font-black uppercase tracking-widest">Privacy</Link>
                    <Link href="/legal" className="hover:text-accent transition-colors text-[10px] font-black uppercase tracking-widest">Legal</Link>
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] italic">
                    © {currentYear} Architectural Excellence.
                </p>
            </div>
        </footer>
    );
}

