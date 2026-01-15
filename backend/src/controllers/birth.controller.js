import Birth from "../models/birth.model.js";

export const applyBirth = async (req, res) => {
  try {
    const birth = await Birth.create({ ...req.body, applicant: req.user.id });
    res.status(201).json(birth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBirths = async (req, res) => {
  try {
    const births = await Birth.find().populate("applicant", "name email");
    res.json(births);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBirthById = async (req, res) => {
  try {
    const birth = await Birth.findById(req.params.id).populate("applicant", "name email");
    if (!birth) return res.status(404).json({ message: "Not found" });
    res.json(birth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveBirth = async (req, res) => {
  try {
    const birth = await Birth.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(birth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectBirth = async (req, res) => {
  try {
    const birth = await Birth.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", remarks: req.body.remarks },
      { new: true }
    );
    res.json(birth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
