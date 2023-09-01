import { Router } from "express";
import multer from "multer";
import { uploadPhoto } from "../controller/uploadController";
import { checkAuth } from "../middleware/checkAuth";

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.route("/").post(upload.single("filename"), checkAuth, uploadPhoto);

export { router as UploadRouter };