import { PrismaClient } from "@prisma/client";
import { sendSpeakerRegistrationEmail } from "../services/emailService.js";

const prisma = new PrismaClient();

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{8,}$/;
  return phoneRegex.test(phone);
};

export const registerSpeaker = async (req, res) => {
  const speakerData = req.body;

  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'institutionName', 'paperSubject', 'paperTitle', 'paperAbstract', 'country'];
    const missingFields = requiredFields.filter(field => !speakerData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`,
        success: false
      });
    }

    // Validate email format
    if (!validateEmail(speakerData.email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false
      });
    }

    // Validate phone format
    if (!validatePhone(speakerData.phone)) {
      return res.status(400).json({
        message: "Invalid phone number format",
        success: false
      });
    }

    // Validate paper abstract length
    if (speakerData.paperAbstract.length < 10) {
      return res.status(400).json({
        message: "Paper abstract must be at least 10 characters long",
        success: false
      });
    }

    // Check if email already exists
    const existingSpeaker = await prisma.speaker.findUnique({
      where: { email: speakerData.email }
    });

    if (existingSpeaker) {
      return res.status(400).json({
        message: "Speaker already registered with this email",
        success: false
      });
    }

    // Create new speaker
    const newSpeaker = await prisma.speaker.create({
      data: speakerData,
    });

    // Send registration confirmation emails
    await sendSpeakerRegistrationEmail(newSpeaker);

    res.status(201).json({
      message: "Speaker registered successfully",
      user: newSpeaker,
      success: true,
    });
  } catch (error) {
    console.error('Speaker registration error:', error);
    res.status(500).json({
      message: "Error registering Speaker",
      error: error.message,
      success: false,
    });
  }
};

export const getSpeakers = async (req, res) => {
  try {
    const speakers = await prisma.speaker.findMany();
    res.status(200).json({ speakers, success: true });
  } catch (error) {
    console.error('Error retrieving speakers:', error);
    res.status(500).json({
      message: "Error retrieving Speaker",
      error: error.message,
      success: false,
    });
  }
};
