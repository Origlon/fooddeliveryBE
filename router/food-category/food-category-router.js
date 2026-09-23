import express from "express";

import { delCategory } from "../../controllers/food-category/del-category.js";
import { getFoodCategory } from "../../controllers/food-category/get-food-category.js";
import { uptadeCategory } from "../../controllers/food-category/uptade-food-category.js";
import { createFoodCategoryController } from "../../controllers/food-category/create-food-category.js";

import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";

const router = express.Router();

// Public
router.get("/get", getFoodCategory);

// Admin only
router.post(
  "/create",
  requireToken,
  requireAdmin,
  createFoodCategoryController,
);

router.put("/update", requireToken, requireAdmin, uptadeCategory);

router.delete("/delete", requireToken, requireAdmin, delCategory);

export default router;
