import express, { response } from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  number: {type: Number, required:true}
});

 export const User = mongoose.model("User", userSchema);