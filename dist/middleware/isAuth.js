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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedUser = void 0;
const catchAsyncErrors_1 = require("./catchAsyncErrors");
const ErrorHandler_1 = require("../utils/ErrorHandler");
exports.isAuthenticatedUser = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.session.passport) === null || _a === void 0 ? void 0 : _a.user;
        if (!token) {
            return next(new ErrorHandler_1.ErrorHandler("Please Login", 401));
        }
        req.body.userId = token;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            msg: `Login first:)`,
        });
    }
}));
//# sourceMappingURL=isAuth.js.map