import { User } from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/mailer.js";
import "dotenv/config";

export const Register = async (req, res) => {
  try {
    const { FullName, Username, Password, ConfirmPassword, Gender } = req.body;
    if (!FullName || !Username || !Password || !ConfirmPassword || !Gender) {
      return res.status(400).json("All fields are required");
    }
    if (Password !== ConfirmPassword) {
      return res.status(400).json("Passwords do not match");
    }

    const existingUser = await User.findOne({ Username });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json("User already exists!");
      } else {
        await User.deleteOne({ Username });
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      FullName,
      Username,
      Password: hashedPassword,
      Gender,
      verificationToken,
      isVerified: false, 
    });

    sendVerificationEmail(newUser, verificationToken);

    res.status(200).json("Registration successful, please check your email for the verification link.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  
  try {
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return res.status(400).json("Invalid or expired verification token.");
    }

    user.isVerified = true; 
    user.verificationToken = undefined; 

    await user.save();

    res.status(200).json("Email verified successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).json("all fields are required!");
  }
  try {
    const newUser = await User.findOne({ Username });
    if (!newUser) {
      return res.status(400).json("User does not exists!");
    }

    const isPasswordMatch = await bcrypt.compare(Password, newUser.Password);
    if (!isPasswordMatch) {
      return res.status(400).json("wrong password!");
    }
    const TokenData = {
      UserId: newUser._id,
    };
    const Token = await jwt.sign(TokenData, process.env.JWT_SECRETE_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("Token", Token, {
        MaxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({...newUser.toObject(), token : Token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Logout = (req, res) => {
  try {
    return res.status(200).cookie("Token", "", { MaxAge: 0 }).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetOtherUser = async (req, res) => {
  try {
    const LoggedInUser = req.id;
    const OtherUsers = await User.find({ _id: { $ne: LoggedInUser } }).select("-Password");

   
    const VerifiedUsers = OtherUsers.filter(user => user.isVerified);
      
    if (!VerifiedUsers || VerifiedUsers.length === 0) {
      return res.status(404).json({ message: "No verified users found" });
    }

    return res.status(200).json(VerifiedUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
