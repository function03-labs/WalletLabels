import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { chainName } = req.body

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      // For example, using Gmail:
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
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