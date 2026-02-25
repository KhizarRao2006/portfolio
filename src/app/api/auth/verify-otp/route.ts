import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const db = getDb();
        if (!db) {
            return NextResponse.json({ success: false, message: "Database not configured" }, { status: 503 });
        }

        const { otp } = await request.json();

        if (!otp || typeof otp !== "string" || otp.length !== 6) {
            return NextResponse.json({ success: false, message: "Invalid OTP format" }, { status: 400 });
        }

        // Get stored OTP
        const otpDoc = await db.collection("otps").doc("admin").get();

        if (!otpDoc.exists) {
            return NextResponse.json({ success: false, message: "No OTP was requested" }, { status: 400 });
        }

        const otpData = otpDoc.data()!;

        if (Date.now() > otpData.expiresAt) {
            return NextResponse.json({ success: false, message: "OTP has expired" }, { status: 400 });
        }

        if (otpData.used) {
            return NextResponse.json({ success: false, message: "OTP has already been used" }, { status: 400 });
        }

        if (otpData.code !== otp) {
            return NextResponse.json({ success: false, message: "Incorrect OTP" }, { status: 400 });
        }

        // Mark OTP as used
        await db.collection("otps").doc("admin").update({ used: true });

        // Generate session token
        const sessionToken = crypto.randomBytes(32).toString("hex");
        const sessionExpiry = Date.now() + 60 * 60 * 1000; // 1 hour session

        await db.collection("sessions").doc(sessionToken).set({
            createdAt: Date.now(),
            expiresAt: sessionExpiry,
        });

        const response = NextResponse.json({ success: true, message: "OTP verified" });
        response.cookies.set("session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 });
    }
}
