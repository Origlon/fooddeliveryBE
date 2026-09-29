import express from "express";

import { createFood } from "../../controllers/food/create-food.js";
import { getFoods } from "../../controllers/food/get-foods.js";
import { updateFood } from "../../controllers/food/update-food.js";
import { deleteFood } from "../../controllers/food/delete-food.js";

import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";

const router = express.Router();

// Homepage болон admin аль аль нь хоолнуудыг харж болно.
router.get("/", getFoods);

// Зөвхөн admin нэмэх, засах, устгах эрхтэй.
router.post("/", requireToken, requireAdmin, createFood);
router.put("/:id", requireToken, requireAdmin, updateFood);
router.delete("/:id", requireToken, requireAdmin, deleteFood);

export default router;