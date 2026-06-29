export function requireAdmin(req, res, next) {
  const key = process.env.ADMIN_KEY;
  if (!key) return res.status(503).json({ message: "Write access not configured." });

  const auth = req.headers["authorization"];
  if (!auth || auth !== `Bearer ${key}`) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  next();
}
