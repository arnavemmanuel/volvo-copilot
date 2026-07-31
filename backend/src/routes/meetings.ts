import { Router } from "express";
import { getMeetings } from "../services/meetingService.js";

const router = Router();

router.get("/", (_, res) => {
  res.json(getMeetings());
});

export default router;
