import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use("/", express.static("views"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
