import express from "express";
import { getDB } from "../config/db.js";

const router = express.Router();

// GET menu
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const items = await db.collection("menu").find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST menu
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("menu").insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE menu
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const { ObjectId } = await import("mongodb");

    await db.collection("menu").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;