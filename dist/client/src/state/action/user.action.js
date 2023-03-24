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
exports.logoutUser = exports.getUser = void 0;
const user_slice_1 = require("../slice/user.slice");
const axios_1 = __importDefault(require("../../config/axios"));
const getUser = (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, user_slice_1.request)());
        const { data } = yield axios_1.default.get("/api/v1/getUser");
        dispatch((0, user_slice_1.success)(data));
    }
    catch (error) {
        dispatch((0, user_slice_1.failed)(error.response));
    }
});
exports.getUser = getUser;
const logoutUser = (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, user_slice_1.request)());
        yield axios_1.default.post("/api/v1/logout");
        dispatch((0, user_slice_1.logout)());
        location.reload();
    }
    catch (error) {
        dispatch((0, user_slice_1.failed)(error.response));
    }
});
exports.logoutUser = logoutUser;
//# sourceMappingURL=user.action.js.map