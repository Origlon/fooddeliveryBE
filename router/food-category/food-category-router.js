import express from "express";
import { delCategory } from "../../controllers/food-category/del-category.js";
import { getFoodCategory } from "../../controllers/food-category/get-food-category.js"
import { uptadeCategory } from "../../controllers/food-category/uptade-food-category.js";
import { createFoodCategoryController } from "../../controllers/food-category/create-food-category.js";
 
const router = express.Router();
 
router.post("/create", createFoodCategoryController);
router.get("/get", getFoodCategory);
router.put("/update", uptadeCategory);
router.delete("/delete", delCategory);
 
export default router;
 