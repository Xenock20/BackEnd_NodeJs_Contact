import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (header != undefined && header.startsWith("Bearer ")) {
    const bearerHeader = header.split(" ");

    try {
      const token = jwt.verify(bearerHeader[1], process.env.SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token Invalido" });
    }
  } else {
    res.status(401).json({ msg: "No estas autorizado" });
  }
};
