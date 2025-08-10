import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth_routes.js";
import userRouter from "./routes/user_routes.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for requests from the frontend
app.use(
  cors({
    origin: "http://localhost:5174", // Allow requests from this origin (frontend)
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Middleware to parse incoming JSON requests (e.g., from frontend)
app.use(express.json()); // Converts request body to JSON, otherwise req.body will be undefined

// Middleware to parse cookies attached to client requests
app.use(cookieParser());

app.use("/api/auth", authRouter); //auth Router
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDb(); //calling db initialisation
  console.log("Server Started:");
});
