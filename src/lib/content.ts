// ============================================================
// Content Types — defines the shape of all editable site content
// ============================================================

export interface HeroContent {
    badge: string;
    scramblePhrases: string[];
    description: string;
    stats: { value: string; label: string }[];
}

export interface AboutContent {
    sectionLabel: string;
    heading: string;
    subheading: string;
    paragraphs: string[];
    cards: { title: string; description: string }[];
}

export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    desc: string;
    tags: string[];
}

export interface SkillGroup {
    title: string;
    icon: string; // lucide icon key: "cpu" | "layout" | "database" | "smartphone" | "git-branch" | "shield"
    skills: string[];
}

export interface ProjectItem {
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    category: string;
    accent: string;
    highlights: string[];
    links?: { live?: string; github?: string };
}

export interface EducationItem {
    institution: string;
    degree: string;
    icon: string; // "graduation-cap" | "book-open" | "award"
}

export interface ContactContent {
    phone: string;
    email: string;
    socialLinks: { platform: string; url: string }[];
    formHeading: string;
    formQuote: string;
}

export interface SectionVisibility {
    hero: boolean;
    about: boolean;
    experience: boolean;
    skills: boolean;
    projects: boolean;
    education: boolean;
    contact: boolean;
}

export interface SiteContent {
    hero: HeroContent;
    about: AboutContent;
    experience: ExperienceItem[];
    skills: SkillGroup[];
    projects: ProjectItem[];
    education: EducationItem[];
    contact: ContactContent;
    visibility: SectionVisibility;
}

// ============================================================
// Default content — mirrors the current hardcoded values
// ============================================================

export const defaultContent: SiteContent = {
    visibility: {
        hero: true,
        about: true,
        experience: true,
        skills: true,
        projects: true,
        education: true,
        contact: true,
    },
    hero: {
        badge: "Open for worldwide opportunities",
        scramblePhrases: ["Excellence", "Scalability", "Precision", "Innovation"],
        description:
            "I'm Khizar Rao. A Full-Stack & Mobile Developer specializing in high-fidelity products, scalable enterprise ecosystems, and business logic.",
        stats: [
            { value: "02+", label: "Years Exp." },
            { value: "20+", label: "Projects" },
            { value: "10+", label: "Tech Stacks" },
        ],
    },
    about: {
        sectionLabel: "Expertise & Vision",
        heading: "Specialized in scaling",
        subheading: "Enterprise Ecosystems.",
        paragraphs: [
            "Full-stack and Mobile Application Developer with nearly 2 years of experience building web, mobile, and enterprise solutions. I deliver systems that don't just work they scale.",
            "Specialized in ERP & CRM architecture, I solve complex business logic problems using modern high-performance stacks. My focus is always on maintainability, performance, and clean code.",
        ],
        cards: [
            {
                title: "Architecture First",
                description:
                    "Whether it's a healthcare referral system for NHS UK or complex production software, I prioritize scalable database designs and robust API layers.",
            },
            {
                title: "Multi-Stack Mastery",
                description:
                    "From PHP (Laravel/Yii) to Python Django, C# .NET to modern React/Next.js and Flutter ecosystems. I choose the right tool for the specific business challenge.",
            },
        ],
    },
    experience: [
        {
            company: "Cartzlink",
            role: "Full-stack Developer",
            period: "Oct 2024 — Present",
            desc: "Architecting custom ERP, CRM, and Production systems. Leading maintenance for WIP Commander and engineered AI-integrated systems for NHS UK.",
            tags: ["PHP", "Laravel", "Django", "SQL Server"],
        },
        {
            company: "Quantum Leaps",
            role: "PHP Developer (Contract)",
            period: "Sep 2024 — Oct 2024",
            desc: "Delivered rapid CRUD architectures and static business modules while coordinating system requirements.",
            tags: ["PHP", "Architecture", "Consultancy"],
        },
    ],
    skills: [
        { title: "Backend", icon: "cpu", skills: ["PHP (Laravel/Yii)", "Python (Django)", "C# (.NET)", "Node.js", "TypeScript", "REST APIs"] },
        { title: "Frontend", icon: "layout", skills: ["React (Vite)", "Next.js", "Tailwind CSS", "Bootstrap", "JavaScript", "Framer Motion"] },
        { title: "DataLayer", icon: "database", skills: ["SQL Server", "MySQL", "PostgreSQL", "Firebase Firestore", "SQLite"] },
        { title: "Mobile", icon: "smartphone", skills: ["Flutter", "Dart", "Firebase Integration", "Logic Engines"] },
        { title: "DevOps", icon: "git-branch", skills: ["Git", "GitHub/SVN", "Docker", "Legacy Maintenance"] },
        { title: "Enterprise", icon: "shield", skills: ["ERP Systems", "CRM Architecture", "System Design", "Scalable Logic"] },
    ],
    projects: [
        {
            title: "NHS Healthcare Referral System",
            description: "AI-integrated healthcare referral management system for NHS UK.",
            longDescription:
                "Engineered a comprehensive referral management platform handling patient data routing, appointment scheduling, and inter-department communication for NHS healthcare providers.",
            tags: ["Django", "Python", "SQL Server", "AI Integration"],
            category: "AI",
            accent: "from-blue-500/20 to-cyan-500/20",
            highlights: ["HIPAA-compliant architecture", "AI-powered triage", "Real-time referral tracking"],
        },
        {
            title: "WIP Commander",
            description: "Enterprise production tracking and work-in-progress management system.",
            longDescription:
                "Led maintenance and feature development for a large-scale production management platform used across manufacturing operations to track inventory, orders, and job progress.",
            tags: ["PHP", "Laravel", "SQL Server", "ERP"],
            category: "Enterprise",
            accent: "from-amber-500/20 to-orange-500/20",
            highlights: ["Production pipeline tracking", "Real-time dashboards", "Multi-tenant architecture"],
        },
        {
            title: "Custom ERP & CRM Suite",
            description: "Full-scale enterprise resource planning and customer relationship management.",
            longDescription:
                "Architected modular ERP and CRM solutions with custom business logic engines, role-based access control, and automated reporting for enterprise clients.",
            tags: ["PHP", "Laravel", "MySQL", "REST APIs"],
            category: "Enterprise",
            accent: "from-emerald-500/20 to-green-500/20",
            highlights: ["Modular architecture", "Role-based access", "Automated reporting"],
        },
        {
            title: "Portfolio Website",
            description: "Modern, high-performance portfolio with premium design and animations.",
            longDescription:
                "This very website — built with Next.js 16, Tailwind CSS v4, and Framer Motion. Features custom cursor, theme switching, glassmorphism, and a serverless contact form.",
            tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
            category: "Web",
            accent: "from-violet-500/20 to-purple-500/20",
            highlights: ["Custom cursor engine", "Dark/light themes", "Serverless form handling"],
            links: { github: "https://github.com/khizarrao2006/portfolio" },
        },
        {
            title: "Market Teller",
            description: "AI-powered mobile app for stock market insights and portfolio tracking.",
            longDescription:
                "Developed a Flutter-based mobile application with Firebase backend featuring AI-driven market analysis, portfolio management, and real-time stock data visualization.",
            tags: ["Flutter", "Dart", "Firebase", "AI"],
            category: "Mobile",
            accent: "from-rose-500/20 to-pink-500/20",
            highlights: ["AI market analysis", "Real-time data", "Portfolio management"],
        },
        {
            title: "Enterprise Delivery Platform",
            description: "Multi-role logistics platform with real-time tracking and admin controls.",
            longDescription:
                "Built a comprehensive delivery management system supporting users, drivers, and restaurants with real-time order tracking, route optimization, and admin analytics.",
            tags: ["Flutter", "Firebase", "Node.js", "Cloud Functions"],
            category: "Mobile",
            accent: "from-sky-500/20 to-indigo-500/20",
            highlights: ["Multi-role system", "Real-time tracking", "Admin analytics"],
        },
    ],
    education: [
        { institution: "Aptech Learning Pakistan", degree: "Higher Diploma in Software Engineering (HDSE)", icon: "graduation-cap" },
        { institution: "Jamia Millia Degree College", degree: "Intermediate (Computer Science)", icon: "book-open" },
        { institution: "Blue Moon Grammar School", degree: "Matriculation (Computer Science)", icon: "award" },
    ],
    contact: {
        phone: "+92 305 3630364",
        email: "Khizarraoworks@gmail.com",
        socialLinks: [
            { platform: "linkedin", url: "https://www.linkedin.com/in/khizar-rao" },
            { platform: "github", url: "https://github.com/khizarrao2006" },
        ],
        formHeading: "Secure Your Infrastructure",
        formQuote: "Building systems and strategies that make a difference.",
    },
};
