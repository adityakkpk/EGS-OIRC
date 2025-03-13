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

    console.log("db pass: ", admin.password)
    console.log("pass: ", password)
    
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    // const isPasswordValid = password === admin.password;
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
    // Check if the requesting user is a super admin
    if (req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ message: 'Not authorized' });
    }

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

export const getAllAdmins = async (req, res) => {
  try {
    // Check if the requesting user is a super admin
    if (req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const admins = await prisma.admin.findMany({
      where: {
        role: 'ADMIN'
      },
      include: {
        referredUsers: {
          select: {
            name: true,
            email: true,
            createdAt: true,
          }
        },
      },
    });

    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAdminInfo = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
      select: {
        email: true,
        referralCode: true,
        role: true
      }
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getReferredUsers = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
      include: {
        referredUsers: {
          select: {
            name: true,
            email: true,
            createdAt: true,
            isPaid: true
          }
        }
      }
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin.referredUsers);
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