// server/server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const app = express()
app.use(helmet())
app.use(cors({ origin: 'http://localhost:3000' })) // restrict to your React app origin
app.use(express.json())

// rate limit to prevent spam
const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 })
app.use('/api/', limiter)

app.post('/api/send-email', async (req, res) => {
  const { name, email, users, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

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

  try {
    await sgMail.send(msg)
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.listen(3001, () => console.log('Server running on http://localhost:3001'))
