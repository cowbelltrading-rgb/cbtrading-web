'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cb_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        // Slight delay so it doesn't flash on first paint
        const t = setTimeout(() => setVisible(true), 900)
        return () => clearTimeout(t)
      }
    } catch {
      // localStorage blocked (private mode etc.) — don't show banner
    }
  }, [])

  const respond = (choice: 'accepted' | 'declined') => {
    try { localStorage.setItem(STORAGE_KEY, choice) } catch { /* noop */ }
    setVisible(false)
  }

  return (
    <div
      id="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={visible ? 'show' : ''}
    >
      <p className="cookie-text">
        We use essential cookies to make this site work. Optional analytics cookies help us improve.
        See our{' '}
        <Link href="/cookies">Cookie Policy</Link>.
      </p>
      <div className="cookie-btns">
        <button
          className="cookie-decline"
          onClick={() => respond('declined')}
          id="cookie-decline-btn"
        >
          Essential Only
        </button>
        <button
          className="cookie-accept"
          onClick={() => respond('accepted')}
          id="cookie-accept-btn"
        >
          Accept All
        </button>
      </div>
    </div>
  )
}
