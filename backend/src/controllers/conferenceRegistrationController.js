import RegisterUserModel from "../models/conferenceRegisterModel.js";

export const registerUser = async (req, res) => {
    const { name, email, registrationType, institution, country, earlyBird, regFee } = req.body;

    try {
        const newUser = new RegisterUserModel({ name, email, registrationType, institution, country, earlyBird, regFee });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await RegisterUserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
}