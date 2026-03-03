import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { defaultContent } from "@/lib/content";

const FALLBACK_RESPONSE = "I'm sorry, I'm only trained to discuss Khizar's professional profile, skills, and projects. For other inquiries, please contact him at khizarraoworks@gmail.com.";

const HARDCODED_RESPONSES: Record<string, string> = {
    "hello": "Hello! I'm Khizar's AI assistant. How can I help you learn more about his professional work?",
    "hi": "Hi there! I can tell you about Khizar's background, skills, or projects. What would you like to know?",
    "who are you": "I'm an AI assistant dedicated to providing information about Khizar Rao's professional background and expertise.",
    "how are you": "I'm functioning perfectly and ready to help you learn more about Khizar's professional background!",
};

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // 1. Sanitize & Validate
        const sanitizedMessage = message?.trim().slice(0, 500); // Limit length
        const query = sanitizedMessage?.toLowerCase();

        if (!query) return NextResponse.json({ error: "Empty message" }, { status: 400 });

        // 2. Check hardcoded
        if (HARDCODED_RESPONSES[query]) {
            return NextResponse.json({ text: HARDCODED_RESPONSES[query] });
        }

        // 3. Intent Filtering
        const professionalKeywords = [
            "khizar", "work", "project", "skill", "experience", "background", "education",
            "stack", "tech", "contact", "resume", "cv", "hire", "job", "career", "about",
            "developer", "engineer", "software", "code", "portfolio", "what can you do",
            "services", "pricing", "cost", "location", "github", "linkedin"
        ];

        const isProfessional = professionalKeywords.some(k => query.includes(k)) || query.split(' ').length <= 2;

        if (!isProfessional) {
            return NextResponse.json({ text: FALLBACK_RESPONSE });
        }

        // 4. Fetch context from Firestore
        const db = getDb();
        let content = defaultContent;
        if (db) {
            const doc = await db.collection("content").doc("site").get();
            if (doc.exists) {
                const data = doc.data() as any;
                content = { ...defaultContent, ...data };
            }
        }

        // 5. Build prompt
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing in environment variables");
            return NextResponse.json({ error: "The AI service is currently unavailable. Please check back later." }, { status: 503 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                maxOutputTokens: 250,
                temperature: 0.7,
            }
        });

        // Simplified content for token efficiency and clarity
        const summaryContext = {
            name: "Khizar Rao",
            badge: content.hero.badge,
            description: content.hero.description,
            skills: content.skills.map(s => `${s.title}: ${s.skills.join(", ")}`),
            experience: content.experience.map(e => `${e.role} at ${e.company} (${e.period}): ${e.desc}`),
            projects: content.projects.map(p => `${p.title}: ${p.description}. Tech: ${p.tags.join(", ")}`),
            education: content.education.map(ed => `${ed.degree} from ${ed.institution}`),
            contact: {
                email: content.contact.email,
                phone: content.contact.phone,
                socials: content.contact.socialLinks
            }
        };

        const systemPrompt = `
You are the professional AI assistant for Khizar Rao's portfolio.
Answer inquiries about his background, skills, projects, and services using the provided context.

GUIDELINES:
- Be concise (max 3 sentences).
- Stay professional and confident.
- If unsure, direct them to ${content.contact.email}.
- If information isn't in context, don't hallucinate.

CONTEXT:
${JSON.stringify(summaryContext, null, 2)}

USER QUESTION:
${sanitizedMessage}
        `;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text().trim();

        return NextResponse.json({ text: responseText });

    } catch (error) {
        console.error("Chat error:", error);
        return NextResponse.json({ error: "I encountered a minor glitch while processing your request. Please try again." }, { status: 500 });
    }
}
