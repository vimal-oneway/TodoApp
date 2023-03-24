"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todo_route_1 = __importDefault(require("./router/todo.route"));
const user_route_1 = __importDefault(require("./router/user.route"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./database/db");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, ".env") });
require("./middleware/passport.middleware");
const app = (0, express_1.default)();
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
const SECRET = process.env.COOKIE_SECRET;
const DB_URL = process.env.DB_URL;
var cookieOpt = {
    maxAge: 604800000,
    sameSite: "strict",
    secure: false,
};
var sess = {
    resave: false,
    saveUninitialized: false,
    secret: SECRET,
    store: new connect_mongo_1.default({
        mongoUrl: DB_URL,
        ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: cookieOpt,
};
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
    cookieOpt.sameSite = "none";
    cookieOpt.secure = true;
}
app.use((0, express_session_1.default)(sess));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/api/v1/google", (req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
}, passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
app.get("/api/v1/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: `${process_1.env.CLI_URL}/`,
}), function (req, res) {
    res.redirect(`${process_1.env.CLI_URL}/`);
});
app.use("/api/v1/", todo_route_1.default);
app.use("/api/v1/", user_route_1.default);
app.get("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.send("hi");
});
(0, db_1.connect)(DB_URL).then(() => {
    app.listen(process_1.env.PORT, () => {
        console.log(`Server running at http://localhost:${process_1.env.PORT}`);
    });
});
//# sourceMappingURL=index.js.map