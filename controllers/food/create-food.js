import mongoose from "mongoose";

import { Dishes } from "../../schemas/food-schema.js";
import { FoodCategory } from "../../schemas/food-category.js";

export const createFood = async (request, response) => {
  try {
    const { foodName, price, image, ingredients, category } = request.body;

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

    const food = await Dishes.create({
      foodName: foodName.trim(),
      price: parsedPrice,
      image: image.trim(),
      ingredients: ingredients.trim(),
      category,
    });

    await food.populate("category", "categoryName");

    return response.status(201).json({
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    console.error("CREATE FOOD ERROR:", error);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
};