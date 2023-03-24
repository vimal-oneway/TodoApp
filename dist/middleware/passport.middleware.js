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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = __importDefault(require("../models/user.model"));
const options = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET || "",
    callbackURL: `${process.env.SER_URL}/api/v1/google/callback`,
};
const CreateUser = ({ email, userName, googleId, avatar, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = user_model_1.default.create({
        email,
        userName,
        googleId,
        avatar,
    })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        return console.log(error);
    });
    return user;
});
// * set the cookie session
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user._id);
});
// * decode the cookie session
passport_1.default.deserializeUser(function (user, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = yield user_model_1.default.findById(user);
        return cb(null, userInfo);
    });
});
// * find or create a user
passport_1.default.use(new passport_google_oauth20_1.Strategy(options, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = profile;
    const user = yield user_model_1.default.findOne({ googleId: id });
    if (user) {
        return cb(null, user);
    }
    const { name, email, picture } = profile._json;
    const newUser = yield CreateUser({
        email,
        userName: name,
        googleId: id,
        avatar: picture,
    });
    return cb(null, newUser);
})));
//# sourceMappingURL=passport.middleware.js.map