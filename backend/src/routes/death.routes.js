import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import {
  applyDeath,
  getAllDeaths,
  getDeathById,
  approveDeath,
  rejectDeath
} from "../controllers/death.controller.js";

const router = express.Router();

router.post("/", auth, role("citizen"), applyDeath);
router.get("/", auth, role("officer", "admin"), getAllDeaths);
router.get("/:id", auth, role("officer", "admin"), getDeathById);
router.put("/:id/approve", auth, role("officer", "admin"), approveDeath);
router.put("/:id/reject", auth, role("officer", "admin"), rejectDeath);

export default router;
