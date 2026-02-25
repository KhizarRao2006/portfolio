import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "Khizarraoworks@gmail.com";

export async function POST() {
    try {
        const db = getDb();
        if (!db) {
            return NextResponse.json({ success: false, message: "Database not configured" }, { status: 503 });
        }

        const resendKey = process.env.RESEND_API_KEY;
        if (!resendKey) {
            return NextResponse.json({ success: false, message: "Email service not configured" }, { status: 503 });
        }

        const resend = new Resend(resendKey);

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Store OTP in Firestore
        await db.collection("otps").doc("admin").set({
            code: otp,
            expiresAt,
            used: false,
            createdAt: Date.now(),
        });

        // Send OTP via Resend
        const { data, error } = await resend.emails.send({
            from: "Portfolio Admin <onboarding@resend.dev>",
            to: ADMIN_EMAIL,
            subject: "Your Portfolio Edit OTP",
            html: `
                <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 20px;">
                    <h2 style="color: #D4AF37; margin-bottom: 8px;">Portfolio Access Code</h2>
                    <p style="color: #666; font-size: 14px; margin-bottom: 24px;">Your one-time code to edit your portfolio:</p>
                    <div style="background: #0f1110; color: #fff; padding: 20px; border-radius: 12px; text-align: center; font-size: 32px; letter-spacing: 8px; font-weight: bold;">
                        ${otp}
                    </div>
                    <p style="color: #999; font-size: 12px; margin-top: 16px;">This code expires in 10 minutes.</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ success: false, message: `Email error: ${error.message}` }, { status: 500 });
        }

        console.log("OTP email sent successfully:", data);
        return NextResponse.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        console.error("Send OTP Error:", error);
        return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
    }
}
