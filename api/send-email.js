// api/send-email.js
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, users, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const msg = {
      to: process.env.TO_EMAIL || 'info@ibanatidigital.co.za',
      from: process.env.SENDGRID_FROM, // must be verified in SendGrid
      subject: `Quote request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nUsers: ${users}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Users:</strong> ${users}</p>
             <p><strong>Message:</strong><br/>${message}</p>`
    }

    await sgMail.send(msg)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
