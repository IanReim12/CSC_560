import mongoose from "mongoose";
// import { defer } from "stormpath/lib/underscore";
const url = "mongodb://127.0.0.1:27017/issues";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
