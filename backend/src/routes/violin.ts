import express from "express";
import { getViolinNews } from "../services/violinService.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getViolinNews());
});

export default router;