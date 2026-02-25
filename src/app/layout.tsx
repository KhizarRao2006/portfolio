import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Khizar Rao | Full-Stack & Mobile Developer",
    description: "Full-Stack & Mobile Developer portfolio of Khizar Rao. Expert in scaling enterprise systems, ERP solutions, and high-performance mobile applications.",
    keywords: ["Full-Stack Developer", "Mobile Developer", "Flutter", "ERP Solutions", "Next.js", "React"],
    authors: [{ name: "Khizar Rao" }],
    openGraph: {
        title: "Khizar Rao | Portfolio",
        description: "Building scalable enterprise systems and high-performance mobile applications.",
        type: "website",
        locale: "en_US",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "name": "Khizar Rao",
                "jobTitle": "Full-Stack & Mobile Developer",
                "description": "Full-Stack & Mobile Developer specializing in enterprise systems, ERP solutions, and high-performance mobile applications.",
                "email": "Khizarraoworks@gmail.com",
                "telephone": "+923053630364",
                "url": "https://khizarrao.com",
                "knowsAbout": [
                    "Full-Stack Development",
                    "Mobile Development",
                    "Flutter",
                    "React",
                    "Next.js",
                    "Laravel",
                    "Django",
                    "ERP Systems",
                    "CRM Architecture",
                    "TypeScript",
                    "Node.js",
                    "SQL Server",
                    "Firebase"
                ],
                "sameAs": [
                    "https://www.linkedin.com/in/khizar-rao",
                    "https://github.com/khizarrao2006"
                ]
            },
            {
                "@type": "WebSite",
                "name": "Khizar Rao | Portfolio",
                "url": "https://khizarrao.com",
                "description": "Full-Stack & Mobile Developer portfolio of Khizar Rao."
            }
        ]
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
                    <ScrollProgress />
                    <Cursor />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
