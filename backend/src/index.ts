import dotenv from "dotenv";

dotenv.config();
console.log(process.env.GEMINI_API_KEY);
import express from "express";
import cors from "cors";


import dashboardRoutes from "./routes/dashboard.js";
import meetingRoutes from "./routes/meetings.js";
import violinRoutes from "./routes/violin.js";
import emailRoutes from "./routes/emails.js";
import calendarRoutes from "./routes/calendar.js";
import schedulerRoutes from "./routes/scheduler.js";
import meetingPrepRoutes from "./routes/meetingPrep.js";
import copilotRoutes from "./routes/copilot.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/violin", violinRoutes);
app.use("/api/emails", emailRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.use("/api/meeting-prep", meetingPrepRoutes);
app.use("/api/copilot", copilotRoutes);


app.get("/", (_, res) => {
  res.json({
    name: "Volvo Executive Copilot API",
    version: "1.0.0",
    status: "Running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});