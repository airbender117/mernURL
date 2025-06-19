const User = require("../models/User");
const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  await User.create({
    name,
    email,
    password,
  });
  return res
    .status(201)
    .json({ message: "User created successfully", name, email, password });
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid Username or Password" });
  }
  return res
    .status(200)
    .json({ message: "youre damn right", username: user.name, email });
  //return res.redirect("/")
};

const handleUserInfo = async (req, res) => {
  const { email } = req.params;
  try {
    const users = await User.find({ email }).select("-password");
    console.log(users);

    if (!users) return res.status(404).json({ message: "User not found" });

    // Add more fields as needed
    return res.status(200).json({ num: users.length, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserInfo,
};
