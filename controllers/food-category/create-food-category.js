import { response } from "express";
import { FoodCategory } from "../../schemas/food-category.js";
export const createFoodCategoryController = async (request, response) => {
  try {
    const { name } = request.body;
    const foodCategory = await FoodCategory.create({ categoryName: name });
    response
      .status(201)
      .json({ message: "food category created", foodCategory });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
