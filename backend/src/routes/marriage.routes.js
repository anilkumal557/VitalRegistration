import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import {
  applyMarriage,
  getAllMarriages,
  getMarriageById,
  approveMarriage,
  rejectMarriage
} from "../controllers/marriage.controller.js";

const router = express.Router();

router.post("/", auth, role("citizen"), applyMarriage);
router.get("/", auth, role("officer", "admin"), getAllMarriages);
router.get("/:id", auth, role("officer", "admin"), getMarriageById);
router.put("/:id/approve", auth, role("officer", "admin"), approveMarriage);
router.put("/:id/reject", auth, role("officer", "admin"), rejectMarriage);

export default router;
