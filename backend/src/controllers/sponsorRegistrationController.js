import SponsorModel from "../models/sponsorRegisterModel.js";

export const registerSponsor = async (req, res) => {
  const { name, level, amount } = req.body;

  try {
    const newSponsor = new SponsorModel({
      name,
      level,
      amount,
    });
    await newSponsor.save();
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
    const sponsors = await SponsorModel.find();
    res.status(200).json(sponsors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving Sponsor", error: error.message });
  }
};
