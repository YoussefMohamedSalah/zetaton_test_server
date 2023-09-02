import express, { Request, Response } from 'express';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import config from '../config/firebase.config';
import { giveCurrentDateTime } from '../utils/currentDateTime';
import { shortenLink } from '../utils/linkShortener';


//Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();


export const uploadPhoto = async (req: Request, res: Response) => {
	// Check if there is a file in the request
	if (!req.file) return res.status(400).send('No files were uploaded.');
	try {
		// Create a storage reference
		const dateTime = giveCurrentDateTime();
		const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);
		// Create file metadata including the content type
		const metadata = {
			contentType: req.file.mimetype!,
		};

		// Upload the file in the bucket storage
		const snapshot = await uploadBytesResumable(storageRef, req.file.buffer!, metadata);
		//by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

		// Grab the public url
		const downloadURL = await getDownloadURL(snapshot.ref);
		const shortDownloadUrl = await shortenLink(downloadURL);
		console.log('File successfully uploaded.');

		if (shortDownloadUrl instanceof Error || shortDownloadUrl === null) {
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

export const getImageDownloadUrl = async (req: Request, res: Response) => {
	try {
		// Create a reference from a Google Cloud Storage URI
		const gsReference = ref(storage, req.params.name);
		const url = await getDownloadURL(gsReference);
		return res.send(url);
	} catch (error) {
		return res.status(400).send(error.message)
	}
}
