import mongoose from "mongoose";

const connetDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://localhost:27017/tic-tac-toe");
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
