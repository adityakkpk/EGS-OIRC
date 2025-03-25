import express from 'express';
import { transporter } from '../config/email.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Phone validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        // Send email to admin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        // Send confirmation email to user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting us - ICMMCS 2025',
            html: `
                <h2>Thank you for contacting ICMMCS 2025</h2>
                <p>Dear ${name},</p>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <p>Here's a copy of your message:</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <br>
                <p>Best regards,</p>
                <p>ICMMCS 2025 Team</p>
            `
        });

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

export default router;
