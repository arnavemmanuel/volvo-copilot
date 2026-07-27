import express from "express";
import { getEmails } from "../services/emailService.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getEmails());
});

export default router;