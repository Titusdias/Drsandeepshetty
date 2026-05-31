"use server";

import nodemailer from "nodemailer";

export type BookingFormState = {
  ok: boolean;
  message: string;
};

function getMailTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT ?? "");
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("Email transport is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendBookingEmail(payload: {
  name: string;
  phone: string;
  email: string;
  preferred: string;
  service: string;
  message: string;
}) {
  const transporter = getMailTransporter();
  const to = process.env.EMAIL_TO;
  const from = process.env.EMAIL_FROM ?? process.env.EMAIL_USER;

  if (!to || !from) {
    throw new Error("Email recipient or sender is not configured. Set EMAIL_TO and EMAIL_FROM.");
  }

  const text = `New appointment request from the website:

Name: ${payload.name}
Phone: ${payload.phone}
Email: ${payload.email || "(not provided)"}
Preferred date/time: ${payload.preferred || "(not provided)"}
Service interest: ${payload.service || "(not provided)"}
Message:
${payload.message || "(not provided)"}

Received: ${new Date().toLocaleString()}`;

  await transporter.sendMail({
    from,
    to,
    subject: `Appointment request from ${payload.name}`,
    text,
  });
}

export async function submitBooking(
  _previousState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  void _previousState;
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const preferred = String(formData.get("preferred") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) {
    return { ok: false, message: "Please enter your name." };
  }
  if (!phone) {
    return { ok: false, message: "Please enter your phone number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  try {
    await sendBookingEmail({ name, phone, email, preferred, service, message });
  } catch (error) {
    console.error("Booking email failed:", error);
    return {
      ok: false,
      message:
        "Sorry, we could not send your request right now. Please call or WhatsApp us directly.",
    };
  }

  return {
    ok: true,
    message:
      "Thank you — we received your request. Our team will call or WhatsApp you shortly to confirm your visit.",
  };
}
