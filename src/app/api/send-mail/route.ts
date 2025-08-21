import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, 
  },
});

type ContactPayload = {
  name: string;   
  email: string;
  phone?: string;    
  message: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
  /^\+?[()\-\s\d]{7,20}$/;

function sanitize(input: string) {
  return input.replace(/[\r\n\t]+/g, " ").trim();
}

function validateBody(body: any): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid JSON body." };
  }

  const name = typeof body.name === "string" ? sanitize(body.name) : "";
  const email = typeof body.email === "string" ? sanitize(body.email) : "";
  const phone = typeof body.phone === "string" ? sanitize(body.phone) : undefined;
  const message = typeof body.message === "string" ? sanitize(body.message) : "";

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." };
  }
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (phone && !phoneRegex.test(phone)) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (message.length < 10) {
    return { ok: false, error: "Message should be at least 10 characters." };
  }

  return { ok: true, data: { name, email, phone, message } };
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validation = validateBody(json);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { name, email, phone, message } = validation.data;

    const textLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.6; color:#111;">
        <h2 style="margin:0 0 12px 0;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
        <p style="white-space:pre-wrap; margin:0;"><strong>Message:</strong><br/>${message}</p>
      </div>
    `;

    const mailOptions = {
      from: EMAIL_USER,
      to: "support@diffrun.com",
      subject: `New Message from ${name}`,
      text: textLines,
      html,
      replyTo: email, 
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}