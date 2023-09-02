import { Router } from "express";
import multer from "multer";
import { getImageDownloadUrl, uploadPhoto } from "../controller/uploadController";
import { checkAuth } from "../middleware/checkAuth";

// Setting up multer as a middleware to grab photo uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // No larger than 10mb
        fieldSize: 10 * 1024 * 1024, // No larger than 10mb
    },
});
const router = Router();

router.route("/").post(upload.single("file"), uploadPhoto);
router.route("/:name").get(getImageDownloadUrl);

export { router as UploadRouter };