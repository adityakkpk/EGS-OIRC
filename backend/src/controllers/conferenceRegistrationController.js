import { PrismaClient } from '@prisma/client';
import { sendUserRegisterEmail } from '../services/emailService.js';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    const registerUserData = req.body;
    const { referralCode } = registerUserData;

    try {
        // If referral code is provided, verify it exists
        if (referralCode) {
            const admin = await prisma.admin.findUnique({
                where: { referralCode }
            });

            if (!admin) {
                return res.status(400).json({ message: 'Invalid referral code' });
            }
        }

        // Create the user registration
        const newRegisterUser = await prisma.registerUser.create({
            data: {
                name: registerUserData.name,
                email: registerUserData.email,
                registrationType: registerUserData.registrationType,
                institutionName: registerUserData.institutionName,
                country: registerUserData.country,
                phone: registerUserData.phone,
                earlyBird: registerUserData.earlyBird,
                regFee: registerUserData.regFee,
                isPaid: registerUserData.isPaid
            }
        });

        // If referral code exists, create the user record with admin reference
        if (referralCode) {
            await prisma.user.create({
                data: {
                    name: registerUserData.name,
                    email: registerUserData.email,
                    referredBy: referralCode
                }
            });
        }

        // Send confirmation emails
        await sendUserRegisterEmail(registerUserData);

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: newRegisterUser, 
            success: true 
        });
    } catch (error) {
        res.status(400).json({ 
            error: `Error registering user: ${error.message}`, 
            success: false 
        });
    }
};

export const getUsers = async (req, res) => {
    try {        
        const registeredUsers = await prisma.registerUser.findMany();
        res.status(200).json(registeredUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};