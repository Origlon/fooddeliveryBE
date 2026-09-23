import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../schemas/user.schemas.js";

const signAuthToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const readCredentials = (body) => {
  if (
    typeof body?.email !== "string" ||
    typeof body?.password !== "string"
  ) {
    return null;
  }

  const email = body.email.trim();
  const password = body.password;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
    return null;
  }

  if (bcrypt.truncates(password)) {
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
        message:
          "Valid email and password are required. Password must not exceed 72 bytes.",
      });
    }

    const { email, password } = credentials;

    const user = await User.findOne({ email });

    const hasHash =
      typeof user?.password === "string" &&
      /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(user.password);

    const isMatch =
      hasHash && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      return response.status(401).json({
        message: "Email or password is incorrect",
      });
    }

    const token = signAuthToken(user);

    return response.status(200).json({
      message: "Email and password verified successfully",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role ?? "user",
      },
      token,
    });
  } catch (err) {
    console.error("Login failed:", err.name);

    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return response.status(400).json({
        message: "Email and a password of at least 8 characters are required",
      });
    }

    const trimmedEmail = email.trim();

    const existingUser = await User.findOne({
      email: trimmedEmail,
    });

    if (existingUser) {
      return response.status(409).json({
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: trimmedEmail,
      password: hashedPassword,
      role: "user",
    });

    const token = signAuthToken(user);

    return response.status(201).json({
      message: "User created",
      user: {
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    if (err.code === 11000) {
      return response.status(409).json({
        message: "Email is already registered",
      });
    }

    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};