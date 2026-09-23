import mongoose from "mongoose";

const FoodCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const FoodCategory = mongoose.model("FoodCategory", FoodCategorySchema);
