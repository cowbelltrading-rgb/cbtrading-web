import { NextResponse } from 'next/server'

interface ContactBody {
  name:    string
  company: string
  email:   string
  phone:   string
  service: string
  message: string
  _hp:     string
}

// Basic validation helper
function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

// Basic in-memory rate limiting
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_MAX = 5; // max 5 requests
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(req: Request) {
  // ── Rate Limiting ───────────────────────────────────
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const rateLimitInfo = rateLimitMap.get(ip);

  if (rateLimitInfo && now < rateLimitInfo.resetTime) {
    if (rateLimitInfo.count >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    rateLimitInfo.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
  }

  let body: ContactBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, company, email, phone, service, message, _hp } = body

  // ── Honeypot check ──────────────────────────────────
  if (_hp && _hp.trim() !== '') {
    // Silently accept but discard
    return NextResponse.json({ ok: true })
  }

  // ── Validation ──────────────────────────────────────
  if (!name?.trim())             return NextResponse.json({ error: 'Name is required' },    { status: 422 })
  if (!email?.trim())            return NextResponse.json({ error: 'Email is required' },   { status: 422 })
  if (!isValidEmail(email))      return NextResponse.json({ error: 'Invalid email' },       { status: 422 })
  if (!message?.trim())          return NextResponse.json({ error: 'Message is required' }, { status: 422 })
  if (message.length > 2000)     return NextResponse.json({ error: 'Message is too long' }, { status: 422 })
  if (phone && phone.length > 50) return NextResponse.json({ error: 'Phone number is too long' }, { status: 422 })

  // ── Send email (if Resend key is configured) ────────
  const resendKey = process.env.RESEND_API_KEY
  const toEmail   = process.env.CONTACT_EMAIL_TO   || 'info@cbtrading.ie'
  const opsEmail  = process.env.CONTACT_EMAIL_OPS

  if (resendKey) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      // 1 — Internal notification to company
      await resend.emails.send({
        from:    'Website Enquiry <noreply@cbtrading.ie>',
        to:      opsEmail ? [toEmail, opsEmail] : [toEmail],
        replyTo: email,
        subject: `New Enquiry: ${service || 'General'} — ${name}`,
        html: `
          <h2 style="font-family:sans-serif;color:#0D3B2E;">New Website Enquiry</h2>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;">
            <tr><td style="padding:6px 12px;font-weight:700;width:130px;">Name</td><td style="padding:6px 12px;">${name}</td></tr>
            ${company ? `<tr><td style="padding:6px 12px;font-weight:700;">Company</td><td style="padding:6px 12px;">${company}</td></tr>` : ''}
            <tr><td style="padding:6px 12px;font-weight:700;">Email</td><td style="padding:6px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:6px 12px;font-weight:700;">Phone</td><td style="padding:6px 12px;">${phone}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:6px 12px;font-weight:700;">Service</td><td style="padding:6px 12px;">${service}</td></tr>` : ''}
            <tr><td style="padding:6px 12px;font-weight:700;vertical-align:top;">Message</td><td style="padding:6px 12px;white-space:pre-line;">${message}</td></tr>
          </table>
        `,
      })

      // 2 — Confirmation to customer
      await resend.emails.send({
        from:    'Cowbell Keystone Trading <noreply@cbtrading.ie>',
        to:      [email],
        subject: 'We received your enquiry — Cowbell Keystone Trading',
        html: `
          <p style="font-family:sans-serif;font-size:15px;">Dear ${name},</p>
          <p style="font-family:sans-serif;font-size:15px;">
            Thank you for contacting Cowbell Keystone Trading Ireland Limited.
            We have received your enquiry${service ? ` regarding <strong>${service}</strong>` : ''} and will respond within one business day.
          </p>
          <p style="font-family:sans-serif;font-size:15px;">
            If your matter is urgent, please email us directly at
            <a href="mailto:info@cbtrading.ie">info@cbtrading.ie</a>.
          </p>
          <p style="font-family:sans-serif;font-size:14px;color:#6C757D;">
            Cowbell Keystone Trading Ireland Limited<br/>
            Kilmartin Grove, Republic of Ireland, D15 AX0H<br/>
            Phone: +353 89 489 8717<br/>
            <a href="https://cbtrading.ie">cbtrading.ie</a>
          </p>
        `,
      })
    } catch (err) {
      // Avoid logging sensitive detailed resend errors in production
      if (process.env.NODE_ENV === 'development') {
        console.error('[Contact] Resend error:', err)
      } else {
        console.error('[Contact] Resend error occurred.')
      }
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } else {
    // Dev mode: log to console instead of sending
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact] RESEND_API_KEY not configured — would have sent:')
      console.log({ name, company, email, phone, service, message })
    }
  }

  return NextResponse.json({ ok: true })
}
