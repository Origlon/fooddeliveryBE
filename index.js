import express, { response } from "express";
import mongoose from "mongoose";
import { connectDB } from "./connectDB.js";
import {User} from "./schemas/user.schemas.js"


const app = express();

const PORT = 2222;

app.use(express.json());

connectDB();

app.get("/api/health", (request, response) => {
  response.json({ message: "user created" });
});

app.post("/sign-up", async (request, response) => {

    try {

        const { email, password, number } = request.body;
        const user = await User.create({ email, password, number });
       
        response.json({ message: "user created", user:user });
      } catch (err) {

          response
          .statusCode(500)
          .json({ message: "Internal Server Error", error: err})
      }

    });
    // app.post('/food/category' , async (request, response))

    app.post("/login", async (request, response) => {
        try {
            const {email, password, number } = request.body
            console.log(email, password, number)
            const user = await User.findOne({ email: email});
            if (!user) {
                response.json({message: "user not found"});
            }
            response.json({message: "user found", user:user});
           
        } catch (err) {
            // response
            // .statusCode(500)
            // .json({message : "Internal server error", erorr: err})
        }
    })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});