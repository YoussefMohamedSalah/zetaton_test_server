import { Router } from "express";
import { signIn, signUp } from "../controller/authController";
import { checkAuth } from "../middleware/checkAuth";
const router = Router();


router.route("/signup").post(signUp);
router.route("/signin").post(checkAuth, signIn);

export { router as AuthRouter };