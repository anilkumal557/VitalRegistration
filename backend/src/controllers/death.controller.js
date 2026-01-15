import Death from "../models/death.model.js";

export const applyDeath = async (req, res) => {
  try {
    const death = await Death.create({ ...req.body, applicant: req.user.id });
    res.status(201).json(death);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllDeaths = async (req, res) => {
  try {
    const deaths = await Death.find().populate("applicant", "name email");
    res.json(deaths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDeathById = async (req, res) => {
  try {
    const death = await Death.findById(req.params.id).populate("applicant", "name email");
    if (!death) return res.status(404).json({ message: "Not found" });
    res.json(death);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveDeath = async (req, res) => {
  try {
    const death = await Death.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(death);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectDeath = async (req, res) => {
  try {
    const death = await Death.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", remarks: req.body.remarks },
      { new: true }
    );
    res.json(death);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
