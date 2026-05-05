"use server";

export type BookingFormState = {
  ok: boolean;
  message: string;
};

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

  void preferred;
  void service;
  void message;

  return {
    ok: true,
    message:
      "Thank you — we received your request. Our team will call or WhatsApp you shortly to confirm your visit.",
  };
}
