import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// <-----------------------User Registration ------------------------------>

export const UserRegister = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already in use' });
    }
  
      
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword =await bcrypt.hashSync(password, salt);
  
      
      const user = new User({
        email,
        password: hashedPassword,
      });
  
      const createdUser = await user.save();
  
     
      const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
        expiresIn: "7d", 
      });
  
      
      res.status(201).json({ token, user });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

// <-----------------------User Login ------------------------------>

  export const UserLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
    
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(403).json({ message: "Incorrect password" });
      }
  
    
      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: "7d", 
      });
  
     
      return res.status(200).json({ token, user: { email: user.email, id: user._id } });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };


