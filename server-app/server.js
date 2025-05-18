"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const auth_1 = __importDefault(require("./routes/auth"));
const auth_2 = __importDefault(require("./routes/auth"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
// app.use(cors());
app.use((0, cors_1.default)({
    origin: true, //"http://localhost:3000", // ✅ Replace with frontend origin if needed
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api", auth_2.default);
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // set to true in production with HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));
app.use("/api/auth", auth_1.default);
// Test route
app.get("/", (req, res) => {
    res.send("✅ Server is running");
});
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
});
