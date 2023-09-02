import { Router } from "express";
import multer from "multer";
import { getImageDownloadUrl, uploadPhoto } from "../controller/uploadController";
import { checkAuth } from "../middleware/checkAuth";

// Setting up multer as a middleware to grab photo uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // No larger than 5mb
        fieldSize: 5 * 1024 * 1024, // No larger than 5mb
    },
});
const router = Router();

router.route("/").post(upload.single("file"), uploadPhoto);
router.route("/:name").get(getImageDownloadUrl);

export { router as UploadRouter };