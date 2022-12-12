import { Router } from "express";
import { getContacts, getContact, addContact, updateContact, deleteContact } from "../controllers/controllers.js";

const router = Router();

router.get("/", getContacts);

router.get("/:id", getContact);

router.post("/", addContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

export default router;