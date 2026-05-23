import express from "express";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

import { protect } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";

const router = express.Router();

router.use(protect);

router.use(adminOnly);

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;