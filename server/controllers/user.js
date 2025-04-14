const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

// Hardcoded user creation (once)
exports.seedUser = async (req, res) => {
  try {
    const existing = await User.findOne({ email: "intern@dacoid.com" });
    if (existing)
      return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash("Test123", 10);
    const user = new User({
      email: "intern@dacoid.com",
      password: hashedPassword,
    });
    await user.save();
    res.json({ success: true, message: "User created" });
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).json({ success: false, message: "Error seeding user" });
  }
};

//   Sign up
exports.signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });

    if (!password || !confirmPassword)
      return res.status(400).json({
        success: false,
        message: "Password fields are required",
      });

    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Registered Succesfully",
      user: user,
    });
  } catch (error) {
    console.log("ERROR", error);
    res
      .status(500)
      .json({ success: false, message: "Error in registering user" });
  }
};
// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).json({ success: false, message: "Login error" });
  }
};
