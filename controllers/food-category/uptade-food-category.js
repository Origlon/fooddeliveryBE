import { FoodCategory } from "../../schemas/food-category.js";
export const uptadeCategory = async (request, response) => {
  try {
    const { id, categoryName } = request.body;
    const foodCategory = await FoodCategory.findByIdAndUpdate(
      id,
      { categoryName: categoryName },
      { new: true },
    );

    if (!foodCategory) {
      return response.status(404).json({ message: "food category not found" });
    }
    response.status(200).json({ message: "food category updated", deletedCategory });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
