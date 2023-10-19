const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uniqe: [true, "subCategory must be uniqe"],
      minlength: [2, "the name is too short"],
      maxlength: [32, "the name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubCategory", subcategorySchema);
