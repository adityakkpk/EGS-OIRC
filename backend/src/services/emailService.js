import { transporter } from "../config/email";
import {
  welcomeTemplate,
  adminNotificationTemplate,
} from "../utils/emailTemplates/userRegistration.js";

function validateUserData(userData) {
  if (!userData.email || !userData.name || !userData.phone) {
    throw new Error("Invalid user data provided");
  }
  // Add email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error("Invalid email format");
  }
}

export async function sendUserRegisterEmail(userRegisterData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userRegisterData.email,
    subject: "ICMMSC 2025 | Conference Registration Email",
    html: welcomeTemplate(userRegisterData),
  };

  const confirmationMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Conference Registration`,
    html: adminNotificationTemplate(userRegisterData),
  };

  try {
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(confirmationMailOptions),
    ]);

    console.log(
      `Registration emails sent successfully for ${userRegisterData.email}`
    );
    return true;
  } catch (error) {
    console.error("Email service error:", {
      error: error.message,
      user: userRegisterData.email,
      timestamp: new Date().toISOString(),
    });
    throw new Error(`Failed to send registration emails: ${error.message}`);
  }
}
