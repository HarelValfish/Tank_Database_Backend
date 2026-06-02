import { Router } from "express";
import {
  getTanks,
  getTankById,
  createTank,
  updateTank,
  getFilterMeta,
} from "../controllers/tankController.js";

const router = Router();

router.get("/", getTanks);
router.get("/meta/filters", getFilterMeta);
router.get("/:id", getTankById);
router.post("/", createTank);
router.put("/:id", updateTank);

export default router;
