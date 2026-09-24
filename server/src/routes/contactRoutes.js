import { Router } from "express";
import Contact from "../models/Contact.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        message: "Name, email and message are required.",
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    // Optional Brevo email notification.

    if (
      process.env.BREVO_API_KEY &&
      process.env.BREVO_SENDER_EMAIL &&
      process.env.CONTACT_TO
    ) {
      console.log("Brevo config:", {
        apiKey: true,
        sender: process.env.BREVO_SENDER_EMAIL,
        receiver: process.env.CONTACT_TO,
      });

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "Kamal Portfolio",
            email: process.env.BREVO_SENDER_EMAIL,
          },

          to: [
            {
              email: process.env.CONTACT_TO,
            },
          ],

          replyTo: {
            email: email.trim(),
            name: name.trim(),
          },

          subject: `New portfolio message from ${name.trim()}`,

          textContent:
            `Name: ${name.trim()}\n` +
            `Email: ${email.trim()}\n\n` +
            `Message:\n${message.trim()}`,
        }),
      });

      const data = await response.json();

      console.log("Brevo status:", response.status);
      console.log("Brevo response:", data);

      if (!response.ok) {
        console.error("Brevo error:", data);
      }
    }

    res.status(201).json({
      message: "Message sent successfully.",
      id: contact._id,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to send message.",
      success: false,
    });
  }
});

export default router;
