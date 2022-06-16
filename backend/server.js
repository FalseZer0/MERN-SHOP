import express from "express";
import colors from "colors";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import pkg from "cloudinary";

const cloudinary = pkg;
dotenv.config();

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

connectDB();

const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//middleware to parse json data in the body of request
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("api is running");
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/upload", uploadRoutes);
//below are the routes that are not defined and thus to be caught by the middleware
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
//making the upload folder that is the one for the images static so its accessible for the frontend
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(notFound);
app.use(errorHandler);
app.listen(
  PORT,
  console.log(`port is ${PORT} and mode is ${MODE}`.yellow.bold)
);
