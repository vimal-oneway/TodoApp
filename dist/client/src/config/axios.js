"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.withCredentials = true;
axios_1.default.defaults.baseURL = import.meta.env.VITE_REACT_SER_URL;
const instance = axios_1.default.create({
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
});
exports.default = instance;
//# sourceMappingURL=axios.js.map