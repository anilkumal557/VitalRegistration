import Migration from "../models/migration.model.js";

export const applyMigration = async (req, res) => {
  try {
    const migration = await Migration.create({ ...req.body, applicant: req.user.id });
    res.status(201).json(migration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllMigrations = async (req, res) => {
  try {
    const migrations = await Migration.find().populate("applicant", "name email");
    res.json(migrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMigrationById = async (req, res) => {
  try {
    const migration = await Migration.findById(req.params.id).populate("applicant", "name email");
    if (!migration) return res.status(404).json({ message: "Not found" });
    res.json(migration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveMigration = async (req, res) => {
  try {
    const migration = await Migration.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(migration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectMigration = async (req, res) => {
  try {
    const migration = await Migration.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", remarks: req.body.remarks },
      { new: true }
    );
    res.json(migration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
