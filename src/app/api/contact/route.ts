import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, vehicle, luggage, concierge, message, newsletter } = body;

    const { error } = await resend.emails.send({
      from: "Limo Sweden Booking <noreply@limoswe.se>",
      to: ["info@limoswe.se"],
      replyTo: email,
      subject: `New Booking Request — ${vehicle || "Any vehicle"} — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #05050A; color: #F0EEE8;">
          <h2 style="color: #C4A86A; font-weight: 300; letter-spacing: 0.1em; margin-bottom: 24px;">New Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #8B9EB7; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8B9EB7;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C4A86A;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #8B9EB7;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #8B9EB7;">Vehicle</td><td style="padding: 8px 0;">${vehicle || "No preference"}</td></tr>
            <tr><td style="padding: 8px 0; color: #8B9EB7;">Luggage</td><td style="padding: 8px 0;">${luggage || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; color: #8B9EB7;">Concierge</td><td style="padding: 8px 0;">${concierge ? "Yes" : "No"}</td></tr>
            <tr><td style="padding: 8px 0; color: #8B9EB7;">Newsletter</td><td style="padding: 8px 0;">${newsletter ? "Yes" : "No"}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; border-left: 2px solid #C4A86A; background: #0C0C14;">
            <p style="color: #8B9EB7; margin: 0 0 8px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Message</p>
            <p style="margin: 0;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
