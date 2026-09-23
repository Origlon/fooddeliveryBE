import jwt from "jsonwebtoken";

export const requireToken = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return response.status(401).json({
        message: "Token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    request.user = decoded;

    next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid or expired token",
    });
  }
};