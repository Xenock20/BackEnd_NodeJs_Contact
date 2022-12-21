import { Router } from "express";
import {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} from "../controllers/controllers.js";
import { addUser, loginUser } from "../controllers/user.controllers.js";
import { validateToken } from "./validate-token.js";

const router = Router();

router.post("/register", addUser);

router.post("/login", loginUser);

router.get("/contact", validateToken, getContacts);

router.get("/contact/:id", validateToken, getContact);

router.post("/add-contact", validateToken, addContact);

router.put("/uppdate-contact/:id", validateToken, updateContact);

router.delete("/delete-contact/:id", validateToken, deleteContact);

export default router;
