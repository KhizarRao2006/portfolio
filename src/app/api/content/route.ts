import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { defaultContent, type SiteContent } from "@/lib/content";

// Helper: verify session
async function isAuthenticated(request: NextRequest): Promise<boolean> {
    const db = getDb();
    if (!db) return false;

    const sessionToken = request.cookies.get("session")?.value;
    if (!sessionToken) return false;

    const sessionDoc = await db.collection("sessions").doc(sessionToken).get();
    if (!sessionDoc.exists) return false;

    const session = sessionDoc.data()!;
    if (Date.now() > session.expiresAt) {
        await db.collection("sessions").doc(sessionToken).delete();
        return false;
    }

    return true;
}

// GET — fetch all site content (public)
export async function GET() {
    try {
        const db = getDb();
        if (!db) {
            return NextResponse.json(defaultContent);
        }

        const doc = await db.collection("content").doc("site").get();

        if (!doc.exists) {
            return NextResponse.json(defaultContent);
        }

        return NextResponse.json(doc.data() as SiteContent);
    } catch (error) {
        console.error("Get content error:", error);
        return NextResponse.json(defaultContent);
    }
}

// PUT — update site content (requires auth)
export async function PUT(request: NextRequest) {
    try {
        const authenticated = await isAuthenticated(request);
        if (!authenticated) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const db = getDb();
        if (!db) {
            return NextResponse.json({ success: false, message: "Database not configured" }, { status: 503 });
        }

        const content: SiteContent = await request.json();

        await db.collection("content").doc("site").set(content, { merge: true });

        return NextResponse.json({ success: true, message: "Content saved" });
    } catch (error) {
        console.error("Update content error:", error);
        return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
    }
}
