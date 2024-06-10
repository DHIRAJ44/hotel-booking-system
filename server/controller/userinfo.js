const User = require("../models/user.js");

const getregister = async (req, res) => {
  const { user } = req.body;
  const newuser = new User(user);
  try {
    const myData = await newuser.save();
    res.send("User registered successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const getlogin = async (req, res) => {
  const { email, password } = req.body.user;
  console.log(req.body);

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.password === password) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(temp);
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
const getallusers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
   return res.status(400).json({error})
  }
};
module.exports = {
  getregister,
  getlogin,
  getallusers
};
