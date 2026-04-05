import express from "express";
import runGraph from "./ai/graph.ai.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}))

app.get("/", async (req, res) => {
  const result = await runGraph(
    "Write a code to reverse a string in javascript>",
  );
  res.status(200).json({
    message: "Graph executed successfully",
    result: result,
  });
});

app.post("/invoke", async (req, res) => {
  const { prompt } = req.body;

  const result = await runGraph(prompt);
  res.status(200).json({
    message: "Graph executed successfully",
    success: true,
    result,
  });
});

export default app;
