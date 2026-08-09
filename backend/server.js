const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const path = require('path');

// Serve shared assets (images, icons, fonts) from project root
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

const fs = require('fs');

// Debug route to inspect assets folder contents
app.get('/_debug/assets', (req, res) => {
  const assetsDir = path.join(__dirname, '..', 'assets', 'images');
  console.log('Serving assets from:', assetsDir);
  try {
    const files = fs.readdirSync(assetsDir);
    res.json({ assetsDir, files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("FoodBridge Backend is Running!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `FoodBridge server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB Connection Failed:",
      error.message
    );
  });