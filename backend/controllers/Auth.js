const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { userName, email, tel, password } = req.body;

  try {
    const userExists = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (userExists) {
      return res.json({
        success: "failed",
        message: "user already exists with this email or userName",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      tel,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({
      status: "success",
      message: "user registration successful",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      message: "user registration failed",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExits = await User.findOne({ email });
    if (!userExits) {
      return res.json({
        status: "failed",
        message: "No user found, please register first.",
      });
    }
    const compare = await bcrypt.compare(password, userExits.password);
    if (!compare) {
      return res.json({
        status: "failed",
        message: "No user found with this password.",
      });
    }
    const token = jwt.sign(
      {
        user_id: userExits._id,
        email: userExits.email,
        role: userExits.role,
        name: userExits.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      status: "success",
      message: "user login successfull",
      token: token,
      user: {
        user_id: userExits._id,
        email: userExits.email,
        role: userExits.role,
        name: userExits.userName,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "failed",
      message: "user login failed",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "failed",
      message: "user login failed",
    });
  }
};

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      status: "failed",
      message: "Unauthorised user",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "unAuthorised user",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  authMiddleWare,
};
