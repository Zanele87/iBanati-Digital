// src/pages/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, error: "" });
  const [showPopup, setShowPopup] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ loading: false, ok: false, error: err });
      return;
    }

    setStatus({ loading: true, ok: null, error: "" });

    try {
      // Replace with your backend endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      setForm({ name: "", email: "", message: "" });
      setStatus({ loading: false, ok: true, error: "" });

      // Show popup overlay
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    } catch (error) {
      setStatus({ loading: false, ok: false, error: error.message });
    }
  }

  return (
    <main className="relative max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Connect with Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Transform Your Managed IT</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            At <span className="font-bold">iBanati Digital</span>, we combine the power of AI with human expertise
            to revolutionize your managed IT experience. From proactive monitoring to personalized support,
            we help businesses thrive in the digital era.
          </p>
          <p className="mb-2 text-gray-700">
            📞 <span className="font-medium">Phone:</span> +27 82 123 4567
          </p>
          <p className="text-gray-700">
            📧 <span className="font-medium">Email:</span> info@ibanatidigital.co.za
          </p>
        </div>

        {/* Right column (form) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                className="mt-1 block w-full border rounded px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {status.loading ? "Sending…" : "Send Message"}
            </button>

            {status.ok === false && (
              <p className="text-red-600 text-sm mt-2">Error: {status.error}</p>
            )}
          </form>
        </div>
      </div>

      {/* Popup overlay */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Information Received</h2>
            <p className="text-gray-700">Thank you for reaching out. We’ll get back to you shortly.</p>
          </div>
        </div>
      )}
    </main>
  );
}
