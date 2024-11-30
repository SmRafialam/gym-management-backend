import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./auth.model.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

const register = async ( name, email, password, role ) => {
    try {
      if (!name || !email || !password || !role) {
        throw new Error("All fields are required: name, email, password, and role");
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email is already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 5);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: 'Trainee', // Default role
      });
  
      await user.save();
  
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );
  
      return { user, token };
    } catch (err) {
      console.error("Registration Error:", err.message);
      throw err;
    }
  };
  
  const login = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );
  
      return { user, token };
    } catch (err) {
      console.error("Login Error:", err.message);
      throw err;
    }
  };

  // Get all trainers
 const getTrainerIds = async () => {
    const trainers = await User.find({ role: 'Trainer' }).select('_id');
    return trainers.map(trainer => trainer._id); 
};

// Get all trainees
 const getTraineeIds = async () => {
    const trainees = await User.find({ role: 'Trainee' }).select('_id');
    return trainees.map(trainee => trainee._id); 
};
  
  export const AuthService = { register, login,getTrainerIds,getTraineeIds };

