import mongoose from "mongoose";

const User=new mongoose.Schema('User',{
  nickName:{
    type:String,
  }
})