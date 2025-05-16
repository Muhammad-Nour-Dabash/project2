import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

const routers = Router();

// POST /api/auth/register
routers.post("/register", async (req:any, res:any) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });

  await user.save();
  res.status(201).json({ message: "User created" });
});

// POST /api/auth/login
routers.post("/login", async (req:any, res:any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  req.session.userId = user._id;
  res.status(200).json({ message: "Logged in" });
});

// POST /api/auth/logout
routers.post("/logout", (req:any, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logged out" });
  });
});

// GET /api/auth/me
routers.get("/me", (req:any, res:any) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json({ userId: req.session.userId });
});

export default routers;
