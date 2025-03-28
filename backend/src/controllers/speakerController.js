import { PrismaClient } from "@prisma/client";
import { sendSpeakerRegistrationEmail } from "../services/emailService.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// Validate Cloudinary configuration
const validateCloudinaryConfig = () => {
  const requiredEnvVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required Cloudinary environment variables: ${missingVars.join(', ')}`);
  }
};

// Configure Cloudinary
try {
  validateCloudinaryConfig();
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.error('Cloudinary configuration error:', error.message);
  throw error;
}

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "icmmcs_papers",
    allowed_formats: ["doc", "docx", "pdf"],
    resource_type: "raw",
  },
});

const upload = multer({ storage: storage });

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
  try {
    // Handle file upload
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error('File upload error:', err.message);
        return res.status(400).json({
          message: err.message,
          success: false,
        });
      }

      const speakerData = {
        ...req.body,
        fileUrl: req.file ? req.file.path : null,
      };

      // Validate required fields
      const requiredFields = [
        "name",
        "email",
        "phone",
        "institutionName",
        "paperTitle",
        "country",
        "conferencePlace",
        "conferenceTitle",
        "attendeeType",
        "message",
      ];

      const missingFields = requiredFields.filter(
        (field) => !speakerData[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
          success: false,
        });
      }

      // Validate email format
      if (!validateEmail(speakerData.email)) {
        return res.status(400).json({
          message: "Invalid email format",
          success: false,
        });
      }

      // Validate phone format
      if (!validatePhone(speakerData.phone)) {
        return res.status(400).json({
          message: "Invalid phone number format",
          success: false,
        });
      }

      try {
        // Check if email already exists
        const existingSpeaker = await prisma.speaker.findUnique({
          where: { email: speakerData.email },
        });

        if (existingSpeaker) {
          return res.status(400).json({
            message: "Speaker already registered with this email",
            success: false,
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
      } catch (dbError) {
        console.error('Database operation error:', dbError.message);
        throw dbError;
      }
    });
  } catch (error) {
    console.error("Speaker registration error:", error.message);
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
    console.error("Error retrieving speakers:", error.message);
    res.status(500).json({
      message: "Error retrieving Speaker",
      error: error.message,
      success: false,
    });
  }
};
