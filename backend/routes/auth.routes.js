import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

authRouter.post("/refreshToken", authController.refreshToken);

authRouter.get("/get-me", authController.getMe);

authRouter.post("/logout", authController.logout);

authRouter.post("/logoutAll", authController.logoutAll);

authRouter.get("/verifyOTP", authController.verifyOTP);

export default authRouter;
