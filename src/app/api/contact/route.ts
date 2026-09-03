import { siteConfig } from "@/lib/site-config";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  // Evict expired entries if Map size grows to prevent memory leaks in persistent processes
  if (submissions.size > 500) {
    for (const [key, timestamps] of submissions.entries()) {
      const valid = timestamps.filter((t) => now - t < WINDOW_MS);
      if (valid.length === 0) {
        submissions.delete(key);
      } else {
        submissions.set(key, valid);
      }
    }
  }

  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const honeypot = String(body.company || "").trim();

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    const errors: Record<string, string> = {};
    if (!name || name.length > 120) errors.name = "Please enter a valid name.";
    if (!EMAIL_REGEX.test(email) || email.length > 200) errors.email = "Please enter a valid email.";
    if (!message || message.length < 5 || message.length > 5000) {
      errors.message = "Please share a bit more detail (5–5000 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
    const rawFromEmail = (process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev").trim();
    const fromEmail = rawFromEmail.includes("<")
      ? rawFromEmail
      : `${siteConfig.name} <${rawFromEmail}>`;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email delivery isn't configured yet. Please email directly instead." },
        { status: 500 }
      );
    }

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    // --- Concurrent Email Dispatches ---
    const adminEmailPayload = {
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `🚀 New message from ${name}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; }
          .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #09090b; color: #ffffff; padding: 24px 32px; }
          .header h2 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.5px; }
          .header p { margin: 4px 0 0 0; color: #a1a1aa; font-size: 13px; }
          .content { padding: 32px; }
          .field-box { background: #f8fafc; border: 1px solid #f1f5f9; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; }
          .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 4px; }
          .value { font-size: 14px; font-weight: 600; color: #0f172a; word-break: break-word; }
          .message-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-top: 8px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap; }
          .footer { background: #fafafa; border-top: 1px solid #f4f4f5; padding: 16px 32px; text-align: center; font-size: 12px; color: #a1a1aa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Inquiry Received</h2>
            <p>Sent from portfolio contact form</p>
          </div>
          
          <div class="content">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
              <tr>
                <td width="50%" style="padding-right: 8px;">
                  <div class="field-box">
                    <div class="label">Sender Name</div>
                    <div class="value">${escapeHtml(name)}</div>
                  </div>
                </td>
                <td width="50%" style="padding-left: 8px;">
                  <div class="field-box">
                    <div class="label">Email Address</div>
                    <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></div>
                  </div>
                </td>
              </tr>
            </table>

            <div class="label" style="margin-top: 8px;">Message</div>
            <div class="message-box">${escapeHtml(message)}</div>
          </div>

          <div class="footer">
            Automated message from <strong>${siteConfig.name}</strong> portfolio system.
          </div>
        </div>
      </body>
      </html>
    `,
      text: `New message from ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    const userConfirmationPayload = {
      from: fromEmail,
      to: [email],
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; }
            .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background: #09090b; color: #ffffff; padding: 28px 32px; text-align: center; }
            .header h2 { margin: 0; font-size: 22px; font-weight: 600; }
            .header p { margin: 6px 0 0 0; color: #a1a1aa; font-size: 14px; }
            .content { padding: 32px; color: #27272a; line-height: 1.6; font-size: 15px; }
            .message-quote { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 14px 16px; margin: 16px 0; border-radius: 4px; font-size: 14px; color: #475569; white-space: pre-wrap; }
            .footer { background: #fafafa; border-top: 1px solid #f4f4f5; padding: 20px 32px; text-align: center; font-size: 12px; color: #71717a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Message Received!</h2>
              <p>Thanks for getting in touch</p>
            </div>

            <div class="content">
              <p>Hi <strong>${escapeHtml(name)}</strong>,</p>
              <p>Thank you for reaching out! I've received your message and will review it shortly.</p>
              
              <p>I usually respond within <strong>1 business day</strong>.</p>

              <p style="margin-top: 24px; font-weight: 600; font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">For reference, here is what you sent:</p>
              <div class="message-quote">${escapeHtml(message)}</div>

              <p style="margin-top: 28px;">Best regards,<br><strong>${siteConfig.name}</strong></p>
            </div>

            <div class="footer">
              &copy; ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hi ${name},\n\nThanks for reaching out!`,
    };

    const [adminResult] = await Promise.allSettled([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify(adminEmailPayload),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify(userConfirmationPayload),
      }).catch((err) => console.error("Confirmation email failed:", err)),
    ]);

    if (adminResult.status === "rejected" || (adminResult.status === "fulfilled" && !adminResult.value.ok)) {
      const errData = adminResult.status === "fulfilled" ? await adminResult.value.json() : adminResult.reason;
      console.error("Resend API admin email error:", errData);
      return NextResponse.json(
        { error: "Message could not be sent right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}