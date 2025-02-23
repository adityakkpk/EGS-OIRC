import { PrismaClient } from '@prisma/client';
import { sendUserRegisterEmail } from '../services/emailService.js';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    const registerUSerData = req.body;

    try {
        const newRegisterUser = await prisma.registerUser.create({
            data: registerUSerData
        })

        // send email
        await sendUserRegisterEmail(registerUSerData);

        res.status(201).json({ message: 'User registered successfully', user: newRegisterUser, success: true });
    } catch (error) {
        res.status(400).json({ error: `Error registering user: ${error.message}`, success: false });
    }
}

export const getUsers = async (req, res) => {
    try {        
        const registeredUsers = await prisma.registerUser.findMany();
        res.status(200).json(registeredUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
}