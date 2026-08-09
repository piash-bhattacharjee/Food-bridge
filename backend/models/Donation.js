const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
    },

    donorEmail: {
      type: String,
      required: true,
    },

    foodName: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    foodType: {
      type: String,
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Available",
    },

    volunteerName: {
      type: String,
      default: "",
    },

    volunteerEmail: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);