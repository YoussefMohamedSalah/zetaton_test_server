import { Request, Response } from "express";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import config from "../config/firebase.config"
import { giveCurrentDateTime } from "../utils/currentDateTime";
import { shortenLink } from "../utils/linkShortener";

//Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

export const uploadPhoto = async (req: Request, res: Response) => {
	if (!req.file) return;
	try {
		const dateTime = giveCurrentDateTime();

		const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

		// Create file metadata including the content type
		const metadata = {
			contentType: req.file.mimetype,
		};

		// Upload the file in the bucket storage
		const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
		//by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

		// Grab the public url
		const downloadURL = await getDownloadURL(snapshot.ref);
		const shortDownloadUrl = await shortenLink(downloadURL);
		console.log('File successfully uploaded.');

		if (shortDownloadUrl instanceof Error || null) {
			return res.send({
				message: 'file uploaded to firebase storage',
				name: req.file.originalname,
				type: req.file.mimetype,
				downloadURL: downloadURL
			})
		} else {
			return res.send({
				message: 'file uploaded to firebase storage',
				name: req.file.originalname,
				type: req.file.mimetype,
				downloadURL: downloadURL,
				shortDownloadUrl: shortDownloadUrl
			})
		}

	} catch (error) {
		return res.status(400).send(error.message)
	}
};
