import express from "express";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/* ==============================
   🔥 CREATE RESERVATION
================================ */
router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const { name, date, time, guests } = req.body;

    // ✅ validation
    if (!name || !date || !time || !guests) {
      return res.status(400).json({
        message: "All fields are required ❗",
      });
    }

    const result = await db.collection("reservations").insertOne({
      name,
      date,
      time,
      guests,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Table booked successfully 🎉",
      data: result,
    });

  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({
      message: "Server error ❌",
    });
  }
});

/* ==============================
   🔥 GET ALL RESERVATIONS
================================ */
router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const data = await db
      .collection("reservations")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json(data);

  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      message: "Server error ❌",
    });
  }
});

/* ==============================
   🔥 DELETE RESERVATION (OPTIONAL)
================================ */
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();

    await db.collection("reservations").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({ message: "Reservation deleted 🗑️" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      message: "Server error ❌",
    });
  }
});

export default router;