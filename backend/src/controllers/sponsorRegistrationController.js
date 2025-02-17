import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerSponsor = async (req, res) => {
  const sponsorsData = req.body;

  try {
    const newSponsor = await prisma.sponsor.create({
      data: sponsorsData,
    });

    res
      .status(201)
      .json({
        message: "Sponsor registered successfully",
        user: newSponsor,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error registering Sponsor",
        error: error.message,
        success: false,
      });
  }
};

export const getSponsors = async (req, res) => {
  try {
    const sponsors = await prisma.SponsorModel.findMany();
    res.status(200).json({ sponsors, success: true });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving Sponsor",
        error: error.message,
        success: false,
      });
  }
};
