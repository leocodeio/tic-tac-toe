import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true 
  }
});

const User = mongoose.model('User', userSchema);

export default User;
