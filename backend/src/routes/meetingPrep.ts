import express from "express";
import { getMeetingPreparation } from "../services/meetingPrepService.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getMeetingPreparation());
});

export default router;