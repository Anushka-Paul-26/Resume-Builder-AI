import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./Routes/userRoutes.js";
import resumeRouter from "./Routes/resumeRoutes.js";
import aiRouter from "./Routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

try {
  await connectDB();
  console.log("MongoDB connected successfully");
} catch (err) {
  console.error("MongoDB connection failed:", err.message);
  process.exit(1); 
}

app.use(express.json());

app.use(
  cors({
    origin: "https://resume-builder-ai-seven.vercel.app", 
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Server is live..."));
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
