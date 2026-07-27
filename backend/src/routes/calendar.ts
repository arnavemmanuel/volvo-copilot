import express from "express";
import { getCalendarSummary } from "../services/calendarService.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getCalendarSummary());
});

export default router;