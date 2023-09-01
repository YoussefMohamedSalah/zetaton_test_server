import { Request, Response } from "express";
import { addDoc, collection, doc, getDocs, getFirestore, query, where, documentId, updateDoc, deleteDoc } from "firebase/firestore";
import config from "../config/firebase.config"
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";

// Initialize Firebase
initializeApp(config.firebaseConfig);


export const signUp = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) return res.status(400).send("Missing fields");

    const userResponse = await admin.auth().createUser({
        email: email,
        password: password,
        displayName: first_name + " " + last_name,
        emailVerified: false,
        disabled: false,
    });
    res.json(userResponse);

    return;
};

export const signIn = async (req: Request, res: Response) => {

    return;
};