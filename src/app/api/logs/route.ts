import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export const dynamic = 'force-dynamic';

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

export async function GET(request: NextRequest) {
    try {
        const authenticated = await isAuthenticated(request);
        if (!authenticated) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = getDb();
        if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

        const snapshot = await db.collection("chat_logs")
            .orderBy("timestamp", "desc")
            .limit(100)
            .get();

        const logs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(logs);
    } catch (error) {
        console.error("Fetch logs error:", error);
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}
