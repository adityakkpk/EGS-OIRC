import { transporter } from "../config/email.js";
import {
  welcomeTemplate,
  adminNotificationTemplate,
  speakerConfirmationTemplate,
  speakerAdminNotificationTemplate,
  sponsorConfirmationTemplate,
  sponsorAdminNotificationTemplate,
} from "../utils/emailTemplates/userRegistration.js";

function validateUserData(userData) {
  if (!userData.email || !userData.name) {
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
    subject: "ICMMCS 2025 | Conference Registration Email",
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

export async function sendSpeakerRegistrationEmail(speakerData) {
  validateUserData(speakerData);

  const speakerMailOptions = {
    from: process.env.EMAIL_USER,
    to: speakerData.email,
    subject: "ICMMCS 2025 | Speaker Registration Confirmation",
    html: speakerConfirmationTemplate(speakerData),
  };

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Speaker Registration: ${speakerData.name}`,
    html: speakerAdminNotificationTemplate(speakerData),
  };

  try {
    await Promise.all([
      transporter.sendMail(speakerMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    console.log(
      `Speaker registration emails sent successfully for ${speakerData.email}`
    );
    return true;
  } catch (error) {
    console.error("Speaker email service error:", {
      error: error.message,
      speaker: speakerData.email,
      timestamp: new Date().toISOString(),
    });
    // Don't throw error, just log it - we don't want to fail registration if email fails
    return false;
  }
}

export async function sendSponsorRegistrationEmail(sponsorData) {
  validateUserData(sponsorData);

  const sponsorMailOptions = {
    from: process.env.EMAIL_USER,
    to: sponsorData.email,
    subject: "ICMMCS 2025 | Sponsorship Registration Confirmation",
    html: sponsorConfirmationTemplate(sponsorData),
  };

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Sponsor Registration: ${sponsorData.name}`,
    html: sponsorAdminNotificationTemplate(sponsorData),
  };

  try {
    await Promise.all([
      transporter.sendMail(sponsorMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    console.log(
      `Sponsor registration emails sent successfully for ${sponsorData.email}`
    );
    return true;
  } catch (error) {
    console.error("Sponsor email service error:", {
      error: error.message,
      sponsor: sponsorData.email,
      timestamp: new Date().toISOString(),
    });
    // Don't throw error, just log it - we don't want to fail registration if email fails
    return false;
  }
}
