import { Router } from "express";
import { addUser, getAllUsers, updateUser, getUserById, deleteUser } from "../controller/userController";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.route("/").get(checkAuth,getAllUsers).post(checkAuth, addUser);
router.route("/:id").get(checkAuth, getUserById).put(checkAuth, updateUser).delete(checkAuth, deleteUser);

export { router as UserRouter };