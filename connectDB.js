 import mongoose from "mongoose";


 
 export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://origlon:Hooliganz1@food-delivery.ecu2ohp.mongodb.net/",
    );
    console.log("DB is connected");
  } catch (err) {
    console.log(err);
  }
};

connectDB();