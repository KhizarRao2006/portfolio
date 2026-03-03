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
    "bye": "Goodbye! Feel free to return if you have more questions about Khizar's work.",
    "goodbye": "Goodbye! Have a great day.",
    "thanks": "You're very welcome! Let me know if you need anything else.",
    "thank you": "Happy to help! Feel free to ask more about Khizar's projects or skills.",
};

export async function POST(req: Request) {
    try {
        const { message, sessionId, userId, startTime } = await req.json();

        // 1. Sanitize & Validate
        const sanitizedMessage = message?.trim().slice(0, 500); // Limit length
        const query = sanitizedMessage?.toLowerCase().replace(/[?.,!]$/, "");

        if (!query) return NextResponse.json({ error: "Empty message" }, { status: 400 });

        let finalResponse = "";
        let detectedIntent = "professional_query";

        // 4. Fetch context and settings from Firestore
        const db = getDb();
        let content = defaultContent;
        if (db) {
            const doc = await db.collection("content").doc("site").get();
            if (doc.exists) {
                const data = doc.data() as any;
                content = { ...defaultContent, ...data };
            }
        }

        const aiS = content.aiSettings || defaultContent.aiSettings;

        // 2. Check hardcoded (Dynamic)
        const matchedRule = aiS.hardcodedRules.find((r: any) => r.trigger.toLowerCase() === query);
        if (matchedRule) {
            finalResponse = matchedRule.response;
            detectedIntent = "hardcoded_rule";
        } else if (HARDCODED_RESPONSES[query]) {
            // Fallback to legacy hardcoded if not found in dynamic rules
            finalResponse = HARDCODED_RESPONSES[query];
            detectedIntent = "legacy_hardcoded";
        }

        // 3. Intent Filtering
        const professionalKeywords = [
            "khizar", "work", "project", "skill", "experience", "background", "education",
            "stack", "tech", "contact", "resume", "cv", "hire", "job", "career", "about",
            "developer", "engineer", "software", "code", "portfolio", "what can you do",
            "services", "pricing", "cost", "location", "github", "linkedin",
            "python", "php", "javascript", "js", "typescript", "ts", "react", "next",
            "flutter", "dart", "django", "laravel", "sql", "firebase", "mobile", "web",
            "he know", "does he", "can he", "experience in"
        ];

        const isProfessional = professionalKeywords.some(k => query.includes(k)) || query.split(' ').length <= 2;

        if (!finalResponse && !isProfessional) {
            finalResponse = aiS.fallbackResponse || FALLBACK_RESPONSE;
            detectedIntent = "unrelated_fallback";
        }

        // 5. Generate AI Response if needed
        if (!finalResponse) {
            const apiKey = aiS.geminiKey || process.env.GEMINI_API_KEY;
            if (!apiKey) {
                finalResponse = "The AI service is currently unavailable.";
                detectedIntent = "error_api_missing";
            } else {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({
                    model: aiS.modelName || "gemini-3-flash-preview",
                    generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
                });

                const summaryContext = {
                    name: "Khizar Rao",
                    description: content.hero.description,
                    skills: content.skills.map(s => `${s.title}: ${s.skills.join(", ")}`),
                    experience: content.experience.map(e => `${e.role} at ${e.company}: ${e.desc}`),
                    projects: content.projects.map(p => `${p.title}: ${p.description}`)
                };

                const systemPrompt = `${aiS.systemGuideline}\n\nCONTEXT:\n${JSON.stringify(summaryContext)}\n\nUSER QUESTION:\n${sanitizedMessage}`;
                const result = await model.generateContent(systemPrompt);
                finalResponse = result.response.candidates?.[0]?.content?.parts?.[0]?.text || aiS.fallbackResponse || FALLBACK_RESPONSE;
                detectedIntent = "ai_generated";
            }
        }

        // 6. Log to Firestore
        if (db) {
            try {
                const duration = startTime ? Date.now() - startTime : 0;
                await db.collection("chat_logs").add({
                    userPrompt: sanitizedMessage,
                    aiResponse: finalResponse,
                    timestamp: new Date().toISOString(),
                    sessionId: sessionId || "anonymous",
                    userId: userId || "anonymous",
                    intent: detectedIntent,
                    durationMs: duration
                });
            } catch (logError) {
                console.error("Failed to log chat:", logError);
            }
        }

        return NextResponse.json({ text: finalResponse.trim().replace(/\n+/g, " ") });

    } catch (error) {
        console.error("Chat error:", error);
        return NextResponse.json({ error: "I encountered a minor glitch while processing your request. Please try again." }, { status: 500 });
    }
}
