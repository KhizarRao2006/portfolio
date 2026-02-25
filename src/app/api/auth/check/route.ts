import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
    try {
        const db = getDb();
        if (!db) {
            return NextResponse.json({ authenticated: false });
        }

        const sessionToken = request.cookies.get("session")?.value;

        if (!sessionToken) {
            return NextResponse.json({ authenticated: false });
        }

        const sessionDoc = await db.collection("sessions").doc(sessionToken).get();

        if (!sessionDoc.exists) {
            return NextResponse.json({ authenticated: false });
        }

        const session = sessionDoc.data()!;

        if (Date.now() > session.expiresAt) {
            await db.collection("sessions").doc(sessionToken).delete();
            return NextResponse.json({ authenticated: false });
        }

        return NextResponse.json({ authenticated: true });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json({ authenticated: false });
    }
}
