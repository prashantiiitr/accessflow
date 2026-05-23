import { Response } from "express";

import Record from "../models/Record";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getRecords = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const delay = Number(req.query.delay) || 0;

    setTimeout(async () => {
      let records;

      if (req.user.role === "Admin") {
        records = await Record.find().populate(
          "createdBy",
          "name role"
        );
      } else {
        records = await Record.find({
          createdBy: req.user._id,
        }).populate("createdBy", "name role");
      }

      res.status(200).json({
        success: true,
        count: records.length,
        records,
      });
    }, delay);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Fetch Records",
    });
  }
};