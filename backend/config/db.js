import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connetDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (con) {
      console.log("db connection sucess");
    }else{
      console.log("db connection failed")
    }
  } catch (err) {
    console.log("internal error while connect to db", err);
  }
};

export default connetDB;
