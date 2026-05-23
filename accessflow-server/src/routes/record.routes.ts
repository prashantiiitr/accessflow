import express from "express";

import { getRecords } from "../controllers/record.controller";

import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", protect, getRecords);

export default router;