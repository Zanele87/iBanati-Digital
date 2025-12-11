// src/pages/Contact.jsx
import React, { useState, useRef } from 'react'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [ok, setOk] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const formRef = useRef(null)

  async function submit(e) {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setOk(null)

    const form = new FormData(formRef.current)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      users: form.get('users'),
      message: form.get('message'),
      // optionally include a client-side captcha token if you implement reCAPTCHA v3
      // captchaToken: window.grecaptcha?.getResponse() || null
    }

    try {
      // inside submit()
     const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload),
      })



      if (!res.ok) throw new Error('Network response was not ok')

      setOk(true)
      formRef.current.reset()
      setShowModal(true)
      setTimeout(() => setShowModal(false), 5000)
    } catch (err) {
      console.error(err)
      setOk(false)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="relative">
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl px-6 py-5 max-w-sm w-[90%] text-center">
            <h3 className="text-lg font-semibold mb-2">Message received</h3>
            <p className="text-sm text-slate-300">Thanks for reaching out. Your request has been sent and our team will contact you shortly.</p>
          </div>
        </div>
      )}

      <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide mb-8">Connect With Us</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-semibold text-lg">Let’s Chat</h4>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">We’d love to hear from you. Whether you have questions, need support, or want to explore how <strong>iBanati Digital</strong> can help, our team is ready.</p>
          <div className="mt-4 space-y-1 text-sm text-gray-700 leading-relaxed">
            <p>📧 <strong>Email:</strong> info@ibanati.digital.co.za</p>
            <p>📞 <strong>Phone:</strong> +27 (0)12 345 6789</p>
            <p>📍 <strong>Office:</strong> Pretoria, Gauteng, South Africa</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-semibold">Request a quote</h4>
          <form ref={formRef} className="mt-3 grid gap-3" onSubmit={submit}>
            <input name="name" className="border px-3 py-2 rounded-md text-sm" placeholder="Name" required />
            <input name="email" className="border px-3 py-2 rounded-md text-sm" placeholder="Business email" type="email" required />
            <input name="users" className="border px-3 py-2 rounded-md text-sm" placeholder="Number of users" />
            <textarea name="message" className="border px-3 py-2 rounded-md text-sm" placeholder="Short description" rows={3} />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-60" disabled={sending}>
              {sending ? 'Sending...' : 'Request Quote'}
            </button>

            {ok === true && <div className="text-green-600 text-sm">Sent — we will contact you.</div>}
            {ok === false && <div className="text-red-600 text-sm">Something went wrong. Please try again.</div>}
          </form>
        </div>
      </div>
    </section>
  )
}
