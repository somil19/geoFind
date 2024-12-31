import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

import connectDB from "./config/mongodb.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import geoRouter from "./routes/geoRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Key (set in .env file)
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Address Validation Endpoint
app.post("/validate-address", async (req, res) => {
  const { address } = req.body;

  try {
    const response = await axios.post(
      `https://addressvalidation.gomaps.pro/v1:validateAddress?key=${API_KEY}&input=${encodeURIComponent(
        address
      )}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error validating address:", error.message);
    res.status(500).send("Server Error");
  }
});
app.use("/api/user", userRouter);
app.use("/api/geo", geoRouter);
await connectDB();
// await connectDB();
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
