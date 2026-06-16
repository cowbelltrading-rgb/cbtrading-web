'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const SERVICE_OPTIONS = [
  'Plastic Raw Materials',
  'Packaging Solutions',
  'Forklift Leasing',
  'Consulting Services',
  'Machinery Representation',
  'General Enquiry',
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface Props {
  title?: string
}

export default function ContactForm({ title = 'Send an Enquiry' }: Props) {
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {}
    if (!String(data.get('name') ?? '').trim())    errs.name    = 'Full name is required'
    const email = String(data.get('email') ?? '').trim()
    if (!email) errs.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address'
    if (!String(data.get('message') ?? '').trim()) errs.message = 'Please include a message'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const errs = validate(data)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    String(data.get('name')    ?? '').trim(),
          company: String(data.get('company') ?? '').trim(),
          email:   String(data.get('email')   ?? '').trim(),
          phone:   String(data.get('phone')   ?? '').trim(),
          service: String(data.get('service') ?? '').trim(),
          message: String(data.get('message') ?? '').trim(),
          _hp:     String(data.get('_hp')     ?? ''),
        }),
      })
      if (res.ok) {
        setState('success')
        formRef.current?.reset()
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="form-wrap" id="contact-form-success">
        <div className="form-success show">
          <span className="form-success-icon" aria-hidden="true">✅</span>
          <h3>Enquiry Received</h3>
          <p>
            Thank you for contacting Cowbell Keystone. A member of our team will respond within
            one business day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-wrap" id="contact-form-wrap">
      <p className="form-title">{title}</p>

      {state === 'error' && (
        <p role="alert" style={{ color: '#C0392B', fontSize: '.875rem', marginBottom: '1rem', padding: '.75rem', background: '#fdf2f2', border: '1px solid #f5c6cb' }}>
          Something went wrong. Please try again or email us at{' '}
          <a href="mailto:info@cbtrading.ie">info@cbtrading.ie</a>.
        </p>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form">

        {/* Honeypot anti-spam field */}
        <input
          className="honeypot"
          name="_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="cf-name">
              Full Name <span className="form-required" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              className={`form-control${errors.name ? ' error' : ''}`}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'cf-name-err' : undefined}
            />
            {errors.name && <span id="cf-name-err" className="field-error" role="alert">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-company">Company</label>
            <input
              id="cf-company"
              name="company"
              type="text"
              className="form-control"
              autoComplete="organization"
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="cf-email">
              Email <span className="form-required" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              className={`form-control${errors.email ? ' error' : ''}`}
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'cf-email-err' : undefined}
            />
            {errors.email && <span id="cf-email-err" className="field-error" role="alert">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-phone">Phone</label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              className="form-control"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cf-service">Service of Interest</label>
          <select id="cf-service" name="service" className="form-control">
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cf-message">
            Message <span className="form-required" aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            className={`form-control${errors.message ? ' error' : ''}`}
            rows={5}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'cf-message-err' : undefined}
          />
          {errors.message && <span id="cf-message-err" className="field-error" role="alert">{errors.message}</span>}
        </div>

        <button
          type="submit"
          id="cf-submit"
          className="form-submit"
          disabled={state === 'submitting'}
          aria-live="polite"
        >
          {state === 'submitting' ? (
            <>⟳ Sending…</>
          ) : (
            <>Send Enquiry →</>
          )}
        </button>

        <p className="form-privacy">
          Your information is processed in accordance with our{' '}
          <Link href="/privacy">Privacy Policy</Link>. We will not share your details with third parties.
        </p>
      </form>
    </div>
  )
}
