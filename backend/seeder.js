import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    //assuming first user in the array for user insertion is an admin
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data imported".green.inverse);
    //stop node process
    process.exit();
  } catch (e) {
    console.error(`Error: ${e.message}`.red.inverse);
    //stop node process with with error code included
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed".green.inverse);
    process.exit();
  } catch (e) {
    console.error(`Error: ${e.message}`.red.inverse);
    process.exit(1);
  }
};

//script is runned with the following:
/*
node backend/seeder -d -> means destroy func called
to checkt that we need those arguments 
*/
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
