import { connectDB, getDB } from "./config/db.js";
import { menuData } from "./menuData.js";

const seedMenu = async () => {
  try {
    // DB connect
    await connectDB();

    const db = getDB();

    // purana data delete (clean insert)
    await db.collection("menu").deleteMany();

    // Insert new data
    await db.collection("menu").insertMany(menuData);

    console.log("Menu data inserted successfully 🚀");

    process.exit();
  } catch (error) {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  }
};

seedMenu();