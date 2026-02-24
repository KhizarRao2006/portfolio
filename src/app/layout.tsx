import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Cursor from "@/components/Cursor";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Khizar Rao | Senior Full-Stack & Mobile Developer",
    description: "Senior developer portfolio of Khizar Rao. Expert in scaling enterprise systems, ERP solutions, and high-performance mobile applications.",
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
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
                    <Cursor />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
