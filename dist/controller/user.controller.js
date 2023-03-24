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
exports.logout = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.default.findById((_a = req.session) === null || _a === void 0 ? void 0 : _a.passport.user);
        if (!user) {
            next(new ErrorHandler_1.ErrorHandler("please Login", 401));
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout((err) => {
        if (!err) {
            return res.status(200).json(JSON.stringify({
                success: true,
                message: "Logout successfully",
            }));
        }
        return res.status(200).json(JSON.stringify({
            success: false,
            message: "Logout failed",
        }));
    });
});
exports.logout = logout;
//# sourceMappingURL=user.controller.js.map