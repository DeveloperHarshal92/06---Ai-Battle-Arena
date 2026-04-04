import express from "express"
import runGraph from "./ai/graph.ai.js"

const app = express()

app.get("/", async (req, res) => {
  const result = await runGraph("Write a code to reverse a string in javascript>");
  res.status(200).json({
    message : "Graph executed successfully",
    result : result
  });
});

export default app
