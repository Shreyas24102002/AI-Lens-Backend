import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import aiRoutes from "./routes/aiRoutes.js";
import postRoutes from "./routes/postRoutes.js";
const PORT = process.env.PORT || 5000;
// import path from "path";
// import { fileURLToPath } from "url";

dotenv.config();
// This above line allows us to pull our environment variables from dotenv file

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);

app.use("/api/v1/ai", aiRoutes);

// Serving the frontend
// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "./client/dist/index.html")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/client/dist/index.html"));
// });

app.get("/", async (req, res) => {
  res.send("Heyy Shreyaaa");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server has started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
