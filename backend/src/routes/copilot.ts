import express from "express";
import { askCopilot } from "../services/copilotService.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await askCopilot(message);

    res.json(reply);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;