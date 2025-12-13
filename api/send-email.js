// api/send-email.js
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
const SMTP_PORT = Number(process.env.BREVO_SMTP_PORT || 587);
const SMTP_USER = process.env.BREVO_SMTP_USER;
const SMTP_PASS = process.env.BREVO_SMTP_PASS;
const TO_EMAIL = process.env.TO_EMAIL || 'info@ibanatidigital.co.za';
const FROM_EMAIL = 'info@ibanatidigital.co.za';


let transporter; // reuse transporter if possible
function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports (587)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    },
    // optional: set connection timeout
    connectionTimeout: 10_000
  });
  return transporter;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, users, message, honeypot } = req.body || {};

  // Basic validation & anti-spam
  if (honeypot) return res.status(400).json({ error: 'Spam detected' });
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

  if (!SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ error: 'SMTP credentials not configured' });
  }

  try {
    const transporter = getTransporter();

    const mailOptions = {
      from: FROM_EMAIL,          // must be verified in your Brevo account or an authorized sender
      to: TO_EMAIL, 
      subject: `Quote request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nUsers: ${users}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Users:</strong> ${escapeHtml(users)}</p>
             <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g,'<br/>')}</p>`,
      replyTo: email
    };

    const info = await transporter.sendMail(mailOptions);
    // nodemailer returns info, good for debugging
    return res.status(200).json({ ok: true, info: { messageId: info.messageId } });
  } catch (err) {
    console.error('SMTP send error:', err);
    return res.status(500).json({ error: 'Failed to send email', detail: String(err) });
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
