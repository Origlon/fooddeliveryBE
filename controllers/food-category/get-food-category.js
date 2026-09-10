import { response } from "express";
import { FoodCategory } from "../../schemas/food-category.js";
export const getFoodCategory = async (request, response) => {
  try {
   
    const foodCategory = await FoodCategory.find();

   
      response.status(200).json({
        message: "food categories found",
        foodCategories: foodCategory
      });
    
   
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
