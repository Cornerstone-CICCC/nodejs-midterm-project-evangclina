"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dream_routes_1 = __importDefault(require("./routes/dream.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:4321",
    credentials: true
}));
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [
        (_a = process.env.COOKIE_SIGN_KEY) !== null && _a !== void 0 ? _a : "db5c4523bbc",
        (_b = process.env.COOKIE_ENCRYPT_KEY) !== null && _b !== void 0 ? _b : "373bddkjvjd",
    ],
    maxAge: 60 * 60 * 1000
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_routes_1.default);
app.use("/dreams", dream_routes_1.default);
app.use((req, res) => {
    res.status(404).json({ message: "Invalid Route" });
});
// start server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
