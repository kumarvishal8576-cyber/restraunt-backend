import express from "express";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/* 🔥 CREATE ORDER */
router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const { items, total, user } = req.body;

    if (!items || items.length === 0 || !total) {
      return res.status(400).json({ message: "Invalid order data ❗" });
    }

    const result = await db.collection("orders").insertOne({
      items,     // [{ name, price, qty }]
      total,     // number
      user,      // optional (name/email)
      status: "placed",
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Order placed successfully 🎉",
      data: result,
    });
  } catch (err) {
    console.error("POST ORDER ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

/* 🔥 GET ALL ORDERS */
router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const data = await db
      .collection("orders")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json(data);
  } catch (err) {
    console.error("GET ORDER ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

/* 🔥 DELETE ORDER */
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();

    await db.collection("orders").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({ message: "Order deleted 🗑️" });
  } catch (err) {
    console.error("DELETE ORDER ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

export default router;