import { AuthService } from "./auth.service.js";
import User from "./auth.model.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(req.body);
        const user = await AuthService.register(name, email, password, role);
        console.log(user);
        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await AuthService.login(email, password);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUsersByRole = async (req, res) => {
    const { role } = req.params;
    try {
      const users = await User.find({ role });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
