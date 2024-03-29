import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectToDB() {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Connected to db: ${dbConnect.connection.name}`);
  } catch (e) {
    console.log(e);
  }
}
