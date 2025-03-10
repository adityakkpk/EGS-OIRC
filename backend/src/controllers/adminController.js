import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, password } = req.body;

  
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // const isPasswordValid = await bcrypt.compare(password, admin.password);
    const isPasswordValid = password === admin.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: admin.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = Math.random().toString(36).substring(7);

    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
        referralCode,
      },
    });

    res.status(201).json({ message: 'Admin created successfully', referralCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUsers = async (req, res) => {
  const { role, referralCode } = req.user;

  try {
    let users;
    if (role === 'SUPER_ADMIN') {
      users = await prisma.user.findMany({
        include: {
          referredBy: true,
        },
      });
    } else {
      users = await prisma.user.findMany({
        where: {
          referredBy: referralCode,
        },
      });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};