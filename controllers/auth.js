const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, telephone, email, password } = req.body;

    const user = await User.create({
      name,
      telephone,
      email,
      password
    });

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      success: true,
      token
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
exports.logout = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
};
