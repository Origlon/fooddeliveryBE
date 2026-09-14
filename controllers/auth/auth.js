import { User } from "../../schemas/user.schemas.js";

const readCredentials = (body) => {
  if (typeof body?.email !== "string" || typeof body?.password !== "string") {
    return null;
  }

  const email = body.email.trim();
  const password = body.password;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
    return null;
  }

  return { email, password };
};

export const loginController = async (request, response) => {
  response.set("Cache-Control", "no-store");
  try {
    const credentials = readCredentials(request.body);
    if (!credentials) {
      return response.status(400).json({
        message: "Valid email and password are required.",
      });
    }

    const { email, password } = credentials;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return response.status(401).json({
        message: "Email or password is incorrect",
      });
    }

    return response.status(200).json({
      message: "Email and password verified successfully",
      user: { _id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("Login failed:", err.name);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

export const signUpController = async (request, response) => {
  response.set("Cache-Control", "no-store");
  try {
    const credentials = readCredentials(request.body);
    if (!credentials) {
      return response.status(400).json({
        message: "Valid email and password are required.",
      });
    }

    const { email, password } = credentials;
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      return response.status(400).json({
        message:
          "Password needs at least 8 characters, uppercase, lowercase, number and special character.",
      });
    }

    if (await User.findOne({ email })) {
      return response
        .status(409)
        .json({ message: "Email is already registered" });
    }

    const user = await User.create({ email, password });

    return response.status(201).json({
      message: "User created",
      user: { _id: user._id, email: user.email },
    });
  } catch (err) {
    if (err.code === 11000) {
      return response
        .status(409)
        .json({ message: "Email is already registered" });
    }
    console.error("Sign up failed:", err.name);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
