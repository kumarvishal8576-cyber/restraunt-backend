import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected 🔥");

    db = client.db("restraunt"); // same name use karna
  } catch (err) {
    console.error("DB Connection Error ❌:", err.message);
    process.exit(1); // app stop karega agar DB fail ho
  }
};

export const getDB = () => db;