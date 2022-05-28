import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

connectDB();

const app = express();

//middleware to parse json data in the body of request
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
//below are the routes that are not defined and thus to be caught by the middleware

app.use(notFound);
app.use(errorHandler);
app.listen(
  PORT,
  console.log(`port is ${PORT} and mode is ${MODE}`.yellow.bold)
);
