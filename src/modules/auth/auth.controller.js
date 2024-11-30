import { AuthService } from "./auth.service.js";

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
