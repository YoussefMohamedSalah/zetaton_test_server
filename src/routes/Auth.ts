import { Router } from "express";
import { signIn, signUp } from "../controller/authController";
const router = Router();


router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

export { router as AuthRouter };