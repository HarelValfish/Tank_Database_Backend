import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import tankRoutes from "./routes/tankRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow tools without an Origin header (curl, server-to-server) and the configured client.
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
  })
);
app.use(express.json({ limit: "5mb" })); // generous limit so base64 image strings fit

// ─── Routes ──────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ status: "ok", time: new Date().toISOString() }));
app.use("/api/tanks", tankRoutes);

// 404 fallback for unknown API routes.
app.use("/api", (_req, res) => res.status(404).json({ message: "Endpoint not found." }));

// ─── Centralized error handler ───────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("✖  Unhandled error:", err.message);
  res.status(500).json({ message: "Internal server error." });
});

// ─── Boot ────────────────────────────────────────────────────────
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`✔  API running → http://localhost:${PORT}`);
  });
});
