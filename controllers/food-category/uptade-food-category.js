import mongoose from "mongoose";
import { FoodCategory } from "../../schemas/food-category.js";

export const uptadeCategory = async (request, response) => {
  try {
    const { id, categoryName } = request.body;

    // 1. Required validation
    if (!id || typeof categoryName !== "string" || !categoryName.trim()) {
      return response.status(400).json({
        message: "Category id and category name are required",
      });
    }

    // 2. MongoDB ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid category id",
      });
    }

    const trimmedCategoryName = categoryName.trim();

    // 3. Category байгаа эсэх
    const existingCategory = await FoodCategory.findById(id);

    if (!existingCategory) {
      return response.status(404).json({
        message: "Food category not found",
      });
    }

    // 4. Ижил нэртэй өөр category байгаа эсэх
    const duplicateCategory = await FoodCategory.findOne({
      categoryName: trimmedCategoryName,
      _id: { $ne: id },
    });

    if (duplicateCategory) {
      return response.status(409).json({
        message: "Category name already exists",
      });
    }

    // 5. Update
    const foodCategory = await FoodCategory.findByIdAndUpdate(
      id,
      {
        categoryName: trimmedCategoryName,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    // 6. Updated category буцаана
    return response.status(200).json({
      message: "Food category updated",
      category: foodCategory,
    });
  } catch (err) {
    console.error("UPDATE CATEGORY ERROR:", err);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
};
