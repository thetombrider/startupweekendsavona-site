const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;
const BREVO_LIST_ID = 45;

export async function POST(request: Request) {
  const mediaType = request.headers.get("content-type")?.split(";", 1)[0];
  if (mediaType !== "application/json") {
    return Response.json({ error: "invalid_request" }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  if (process.env.NODE_ENV === "development" && process.env.BREVO_PREVIEW === "1") {
    return Response.json({ preview: true });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    console.error("Ticket interest: BREVO_API_KEY is missing");
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({ email, listIds: [BREVO_LIST_ID], updateEnabled: true }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8_000),
    });

    // Brevo returns 201 for a new contact and 204 for an existing contact.
    if (response.ok) return Response.json({ preview: false });

    console.error("Ticket interest: Brevo rejected the request", response.status);
  } catch {
    console.error("Ticket interest: Brevo request failed");
  }

  return Response.json({ error: "unavailable" }, { status: 502 });
}
