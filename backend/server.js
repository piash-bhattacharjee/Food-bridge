const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");

const app = express();

// Middleware
// Configure CORS: allow local dev origins and the production frontend origin
const FRONTEND_URLS = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [];
const allowedOrigins = [
  ...FRONTEND_URLS,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow non-browser requests (Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    // Temporary opt-in to allow any origin if explicitly enabled via env
    if (process.env.ALLOW_ALL_CORS === 'true') return callback(null, true);
    return callback(new Error('CORS policy: origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
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