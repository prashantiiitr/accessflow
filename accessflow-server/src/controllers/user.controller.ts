import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Fetch Users",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, userId, password, role } = req.body;

    const existingUser = await User.findOne({ userId });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      userId,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Create User",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Update User",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Delete User",
    });
  }
};