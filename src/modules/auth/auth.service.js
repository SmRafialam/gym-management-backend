import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./auth.model.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

const register = async ( name, email, password, role ) => {
    try {
        // console.log(name, email, password, role);
      // Validate input fields
      if (!name || !email || !password || !role) {
        throw new Error("All fields are required: name, email, password, and role");
      }
  
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email is already in use");
      }
    //   console.log("Password before hashing:", password);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 5);
    //   console.log("Password after hashing:", hashedPassword);

      // Create and save the user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      await user.save();
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );
  
      // Return user and token
      return { user, token };
    } catch (err) {
      console.error("Registration Error:", err.message);
      throw err;
    }
  };
  
  const login = async (email, password) => {
    try {
      // Validate input fields
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );
  
      // Return user and token
      return { user, token };
    } catch (err) {
      console.error("Login Error:", err.message);
      throw err;
    }
  };
  
  export const AuthService = { register, login };

