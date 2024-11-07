import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { chainName } = req.body

    // Create a nodemailer transporter using SendGrid's SMTP server
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: true, // Use TLS
      auth: {
        user: "apikey", // This is always 'apikey' for SendGrid
        pass: process.env.SENDGRID_API_KEY,
      },
    })

    // Ensure SENDGRID_FROM_EMAIL is set
    if (!process.env.SENDGRID_FROM_EMAIL) {
      console.error("SENDGRID_FROM_EMAIL is not set in environment variables")
      return res.status(500).json({ error: "Server configuration error" })
    }

    try {
      // Send email
      await transporter.sendMail({
        from: process.env.SENDGRID_FROM_EMAIL, // Make sure this is set in your .env file
        to: "aiden@fn03.xyz",
        subject: "New Chain Suggestion",
        text: `A new chain has been suggested: ${chainName}`,
      })

      res.status(200).json({ message: "Suggestion sent successfully" })
    } catch (error) {
      console.error("Error sending email:", error)
      res.status(500).json({ error: "Failed to send suggestion" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}