import { Dishes } from "../../schemas/food-schema.js";

export const getFoods = async (request, response) => {
  try {
    const foods = await Dishes.find()
      .populate("category", "categoryName")
      .sort({ createdAt: -1 });

    return response.status(200).json({
      message: "Foods found",
      foods,
    });
  } catch (error) {
    console.error("GET FOODS ERROR:", error);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
};