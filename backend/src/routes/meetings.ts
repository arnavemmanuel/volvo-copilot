import { Router } from "express";
import { getMeetings } from "../services/meetingService";

const router = Router();

router.get("/", (_, res) => {
  res.json(getMeetings());
});

export default router;