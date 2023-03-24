"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
router.route("/logout").post(user_controller_1.logout);
router.route("/getUser").get(user_controller_1.login);
module.exports = router;
//# sourceMappingURL=user.route.js.map