import User from "../models/user.model.js";

const createPlayer = async (req, res) => {
  try {
    const { nickName } = req.body;
    const user = await User.create({ nickName });
    // console.log(user);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {createPlayer};
