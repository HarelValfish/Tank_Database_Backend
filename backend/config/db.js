import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB.
 * Exits the process on failure so the issue is loud and obvious instead of
 * leaving the API running against a dead database.
 */
export async function connectDB(uri) {
  if (!uri) {
    console.error("✖  MONGO_URI is not defined. Check your backend/.env file.");
    process.exit(1);
  }

  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(uri);
    console.log(`✔  MongoDB connected → ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error("✖  MongoDB connection error:", err.message);
    process.exit(1);
  }

  // Surface runtime connection drops rather than swallowing them.
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠  MongoDB disconnected.");
  });
}
