import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// 🔐 Generate Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// 📌 GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};


// 📌 GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};


// 📌 GET USER BY EMAIL / SIC
export const getUserByDiffField = async (req, res) => {
  try {
    const { parameter } = req.params;

    const user = await User.findOne({
      $or: [
        { email: parameter },
        { sic: parameter }
      ]
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};


// 📌 REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, mobile, email, sic, password } = req.body;

    if (!name || !mobile || !email || !sic || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ mobile }, { email }, { sic }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with given mobile/email/sic"
      });
    }

    const newUser = await User.create({
      name,
      mobile,
      email,
      sic,
      password
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 📌 LOGIN USER
export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);
    // res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("token", token, {
        httpOnly: true,          
        secure: false,           
        sameSite: "strict",      
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });


    return res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 📌 GET CURRENT USER (Protected)
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};


// 📌 UPDATE USER (only self)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      {returnDocument: 'after'}
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);

  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};


// 📌 DELETE USER (only self)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};