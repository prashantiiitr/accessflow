import express from 'express';

import dotenv from 'dotenv';

import cors from 'cors';

import morgan from 'morgan';

import bcrypt from 'bcryptjs';

import connectDB from './config/db';

import authRoutes from './routes/auth.routes';

import userRoutes from './routes/user.routes';

import recordRoutes from './routes/record.routes';

import User from './models/User';

import Record from './models/Record';

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',

    credentials: true,
  })
);

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/records', recordRoutes);

app.get('/', (req, res) => {
  res.send('AccessFlow API Running');
});

app.get('/seed', async (req, res) => {
  try {
    await User.deleteMany();

    await Record.deleteMany();

    const hashedPassword = await bcrypt.hash(
      '123456',
      10
    );

    const users = await User.insertMany([
      {
        name: 'Admin User',

        userId: 'admin',

        password: hashedPassword,

        role: 'Admin',
      },

      {
        name: 'General User',

        userId: 'user',

        password: hashedPassword,

        role: 'General User',
      },
    ]);

    await Record.insertMany([
      {
        title: 'Financial Report',

        accessLevel: 'High',

        status: 'Active',

        createdBy: users[0]._id,
      },

      {
        title: 'Employee Payroll',

        accessLevel: 'Medium',

        status: 'Pending',

        createdBy: users[0]._id,
      },

      {
        title: 'User Profile Data',

        accessLevel: 'Low',

        status: 'Completed',

        createdBy: users[1]._id,
      },
    ]);

    res.send('Database Seeded Successfully');
  } catch (error) {
    res.status(500).json({
      message: 'Seeding Failed',
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});