import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import {
  applyMigration,
  getAllMigrations,
  getMigrationById,
  approveMigration,
  rejectMigration
} from "../controllers/migration.controller.js";

const router = express.Router();

router.post("/", auth, role("citizen"), applyMigration);
router.get("/", auth, role("officer", "admin"), getAllMigrations);
router.get("/:id", auth, role("officer", "admin"), getMigrationById);
router.put("/:id/approve", auth, role("officer", "admin"), approveMigration);
router.put("/:id/reject", auth, role("officer", "admin"), rejectMigration);

export default router;
