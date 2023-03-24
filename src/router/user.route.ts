import express, { Router } from "express";
import { login, logout } from "../controller/user.controller";

const router: Router = express.Router();

router.route("/logout").post(logout);
router.route("/getUser").get(login);

export = router;
