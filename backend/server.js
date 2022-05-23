import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

const app = express();
app.get("/", (req, res) => {
  res.send("api is running");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(PORT, console.log(`port is ${PORT} and mode is ${MODE}`));
