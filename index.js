import express, { response } from "express";
import mongoose from "mongoose";
import { connectDB } from "./connectDB.js";
import { User } from "./schemas/user.schemas.js";
import cors from "cors"
import { FoodCategory } from "./schemas/food-category.js";
import AuthRouter from "./router/auth/auth.js"
import FoodCategoryRouter from "./router/food-category/food-category-router.js"

const app = express();

const PORT = 2222;

app.use(express.json());
app.use(cors())
connectDB();

app.get("/api/health", (request, response) => {
  response.json({ message: "user created" });
});

app.use("/auth", AuthRouter);
app.use("/food-category", FoodCategoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
