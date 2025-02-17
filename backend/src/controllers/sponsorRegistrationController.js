import { prisma } from "../config/db.js";

export const registerSponsor = async (req, res) => {
  const sponsorsData = req.body;

  try {
    const newSponsor = await prisma.SponsorModel.create({
      data: sponsorsData,
    });

    res
      .status(201)
      .json({ message: "Sponsor registered successfully", user: newSponsor });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering Sponsor", error: error.message });
  }
};

export const getSponsors = async (req, res) => {
  try {
    const sponsors = await prisma.SponsorModel.findMany();
    res.status(200).json(sponsors);

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving Sponsor", error: error.message });
  }
};
