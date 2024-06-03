const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    cartBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    quantity: {
      type: Number,
    },

    variant1: {
      type: String,
    },

    variant2: {
      type: String,
    },

    kilo: {
      type: Number,
    },

    kiloGrams: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Cart", modelSchema);

module.exports = Entity;
