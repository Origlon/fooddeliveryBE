
import { User } from "../../schemas/user.schemas.js";

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
      return response.status(404).json({ message: "user not found" });
    }
    response.status(200).json({ message: "user found", user: user });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.create({ email, password });

    response.status(201).json({ message: "user created", user: user });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
