"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const requireAuth_1 = require("../middleware/requireAuth");
const routers = (0, express_1.Router)();
routers.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, username, email, password } = req.body;
    const exists = yield User_1.default.findOne({ $or: [{ email }, { username }] });
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashed = yield bcryptjs_1.default.hash(password, 10);
    const user = new User_1.default({
        firstName,
        lastName,
        username,
        email,
        password: hashed,
    });
    try {
        yield user.save();
        res.status(201).json({ message: "User created" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}));
// POST /api/auth/login
routers.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    req.session.userId = user._id;
    res.status(200).json({ message: "Logged in" });
}));
// POST /api/auth/logout
routers.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ message: "Logged out" });
    });
});
routers.get("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try {
        const user = yield User_1.default.findById(req.session.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}));
routers.get("/secret", requireAuth_1.requireAuth, (req, res) => {
    res.json({ message: "🎉 This is protected data only for logged-in users!" });
});
exports.default = routers;
