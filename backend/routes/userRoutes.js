import express from "express";
import { getDB } from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("users").insertOne(req.body);

    res.json({ message: "User saved ✅", data: result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const users = await db.collection("users").find().toArray();

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;