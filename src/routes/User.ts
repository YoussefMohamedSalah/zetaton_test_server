import { Router } from "express";
import { addUser, getAllUsers, updateUser, getUserById, deleteUser } from "../controller/userController";

const router = Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export { router as UserRouter };