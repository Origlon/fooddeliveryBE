import mongoose from "mongoose";

import { Dishes } from "../../schemas/food-schema.js";
import { FoodCategory } from "../../schemas/food-category.js";

export const updateFood = async (request, response) => {
  try {
    const { id } = request.params;
    const { foodName, price, image, ingredients, category } = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid food id",
      });
    }

    if (
      typeof foodName !== "string" ||
      !foodName.trim() ||
      typeof ingredients !== "string" ||
      !ingredients.trim() ||
      typeof image !== "string" ||
      !image.trim() ||
      !category
    ) {
      return response.status(400).json({
        message:
          "Food name, price, image, ingredients and category are required",
      });
    }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return response.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return response.status(400).json({
        message: "Invalid category id",
      });
    }

    const existingCategory = await FoodCategory.findById(category);

    if (!existingCategory) {
      return response.status(404).json({
        message: "Food category not found",
      });
    }

    const food = await Dishes.findByIdAndUpdate(
      id,
      {
        foodName: foodName.trim(),
        price: parsedPrice,
        image: image.trim(),
        ingredients: ingredients.trim(),
        category,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("category", "categoryName");

    if (!food) {
      return response.status(404).json({
        message: "Food not found",
      });
    }

    return response.status(200).json({
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    console.error("UPDATE FOOD ERROR:", error);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
};