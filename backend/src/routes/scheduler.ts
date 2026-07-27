import express from "express";
import { getSuggestedMeetings } from "../services/schedulerService.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getSuggestedMeetings());
});

export default router;