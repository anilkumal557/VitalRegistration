import Marriage from "../models/marriage.model.js";

export const applyMarriage = async (req, res) => {
  try {
    const marriage = await Marriage.create({ ...req.body, applicant: req.user.id });
    res.status(201).json(marriage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllMarriages = async (req, res) => {
  try {
    const marriages = await Marriage.find().populate("applicant", "name email");
    res.json(marriages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMarriageById = async (req, res) => {
  try {
    const marriage = await Marriage.findById(req.params.id).populate("applicant", "name email");
    if (!marriage) return res.status(404).json({ message: "Not found" });
    res.json(marriage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveMarriage = async (req, res) => {
  try {
    const marriage = await Marriage.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(marriage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectMarriage = async (req, res) => {
  try {
    const marriage = await Marriage.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", remarks: req.body.remarks },
      { new: true }
    );
    res.json(marriage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
