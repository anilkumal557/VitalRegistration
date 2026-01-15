import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import {
  applyBirth,
  getAllBirths,
  getBirthById,
  approveBirth,
  rejectBirth
} from "../controllers/birth.controller.js";

const router = express.Router();

router.post("/", auth, role("citizen"), applyBirth);
router.get("/", auth, role("officer", "admin"), getAllBirths);
router.get("/:id", auth, role("officer", "admin"), getBirthById);
router.put("/:id/approve", auth, role("officer", "admin"), approveBirth);
router.put("/:id/reject", auth, role("officer", "admin"), rejectBirth);

export default router;
