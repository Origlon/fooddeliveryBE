
import { FoodCategory } from "../../schemas/food-category.js";
export const delCategory = async (request, response) => {
  try {
    const { id } = request.body;
    const deletedCategory = await FoodCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return response.status(404).json({ message: "food category not found" });
    }
    response.status(200).json({ message: "deleted", deletedCategory });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
