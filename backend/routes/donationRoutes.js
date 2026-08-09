const express = require("express");
const Donation = require("../models/Donation");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all donations (public)
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error("Error fetching donations:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET donations by user email (protected)
router.get("/user/:email", auth, async (req, res) => {
  try {
    if (req.user.email !== req.params.email) return res.status(403).json({ message: 'Forbidden' });
    const donations = await Donation.find({
      $or: [
        { donorEmail: req.params.email },
        { volunteerEmail: req.params.email }
      ]
    }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error("Error fetching user donations:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET available donations (public)
router.get("/available", async (req, res) => {
  try {
    const donations = await Donation.find({ status: "Available" }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error("Error fetching available donations:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Accept donation (protected)
router.put("/:id/claim", auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    if (donation.status !== "Available") return res.status(400).json({ message: "Donation is no longer available" });

    donation.status = "Accepted";
    donation.volunteerName = req.user.name;
    donation.volunteerEmail = req.user.email;

    await donation.save();

    res.json({ message: "Donation accepted", donation });
  } catch (err) {
    console.error("Error accepting donation:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET donation by id (public)
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.json(donation);
  } catch (err) {
    console.error("Error fetching donation:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Create donation (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { foodName, quantity, foodType, pickupLocation, description } = req.body;

    if (!foodName || !quantity || !foodType || !pickupLocation) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const donation = new Donation({ donorName: req.user.name, donorEmail: req.user.email, foodName, quantity, foodType, pickupLocation, description });

    const saved = await donation.save();

    res.status(201).json({ message: "Food donation created successfully", donation: saved });
  } catch (err) {
    console.error("Error creating donation:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update donation (protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updates = req.body;
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    // Only donor who created it may update
    if (donation.donorEmail !== req.user.email) return res.status(403).json({ message: 'Forbidden' });

    Object.assign(donation, updates);
    await donation.save();

    res.json({ message: "Donation updated", donation });
  } catch (err) {
    console.error("Error updating donation:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete donation (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    if (donation.donorEmail !== req.user.email) return res.status(403).json({ message: 'Forbidden' });

    await donation.deleteOne();
    res.json({ message: "Donation deleted" });
  } catch (err) {
    console.error("Error deleting donation:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;