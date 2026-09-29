import mongoose from "mongoose";

import { Dishes } from "../../schemas/food-schema.js";

export const deleteFood = async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid food id",
      });
    }

    const deletedFood = await Dishes.findByIdAndDelete(id);

    if (!deletedFood) {
      return response.status(404).json({
        message: "Food not found",
      });
    }

    return response.status(200).json({
      message: "Food deleted successfully",
      food: deletedFood,
    });
  } catch (error) {
    console.error("DELETE FOOD ERROR:", error);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
};
