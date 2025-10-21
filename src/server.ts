import express, {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";
import { User } from "./models/user";

dotenv.config();
const app = express();
app.use(express.json());

const users: User[] = [];
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET; 

app.post(
    "/api/auth/register",
    [
        body("firstName").trim().notEmpty().withMessage("First name is required"),
        body("lastName").trim().notEmpty().withMessage("Last name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("phone").trim().notEmpty().withMessage("Phone number is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    async (req: Request, res: Response): Promise<void> => {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { firstName, lastName, email, phone, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                res.status(409).json({ message: "User with this email already exists" });
                return;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser: User = {
                id: uuidv4(),
                firstName,
                lastName,
                email,
                phone,
                password: hashedPassword,
            };

            users.push(newUser);

            // Generate JWT token
            const token = jwt.sign({ userId: newUser.id }, JWT_SECRET!, { expiresIn: "24h" });

            res.status(201).json({
                message: "User registered successfully",
                token,
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    phone: newUser.phone,
                },
            });
        } catch (error) {
            res.status(500).json({ message: "Server error during registration" });
        }
    }
)

app.post(
    "/api/auth/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    async (req: Request, res: Response): Promise<void> => {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body;

        try {
            // Find user by email
            const user = users.find(user => user.email === email);
            if (!user) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id}, JWT_SECRET!, { expiresIn: "24h" });

            res.status(200).json({
                message: "Sign in successful",
                token,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            });
        } catch (error) {
            res.status(500).json({ message: "Server error during sign in" });
        }
    }
)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})