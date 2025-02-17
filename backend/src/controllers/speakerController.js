import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerSpeaker = async (req, res) => {
  const speakerData = req.body;

  try {
    const newSpeaker = await prisma.speaker.create({
      data: speakerData,
    });

    res
      .status(201)
      .json({
        message: "Speaker registered successfully",
        user: newSpeaker,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
        message: "Error retrieving Speaker",
        error: error.message,
        success: false,
      });
  }
};
