import { conect } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addUser = async (req, res) => {
  const { username, passwords, email } = req.body;

  const passwordScrypt = await bcrypt.hash(passwords, 10);

  conect.query(
    "INSERT INTO users (`username`, `passwords`, `email`) VALUE (?, ?, ?)",
    [username, passwordScrypt, email],
    (err) => {
      if (err) throw err;
      res.send("Added contact");
    }
  );
};

export const loginUser = (req, res) => {
  const { email, passwords } = req.body;

  conect.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length === 0) {
        res.json({ msg: "No existe este correo" });
      } else {
        bcrypt.compare(passwords, data[0].passwords, (err, result) => {
          if (result) {
            const { id, username } = data[0];

            const token = jwt.sign({ id, username }, process.env.SECRET_KEY, {
              expiresIn: "2h",
            });

            res.json({ token });
          } else {
            res.json({ msg: "Contraseña incorrecta" }).status(401);
          }
        });
      }
    }
  });
};
