import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongodb connected ${conn.connection.host}`.cyan.underline);
  } catch (e) {
    console.error(`error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
};
export default connectDB;
