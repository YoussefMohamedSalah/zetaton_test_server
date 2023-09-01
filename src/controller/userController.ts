import { Request, Response } from "express";
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDocs, getFirestore, query, where, documentId, updateDoc, deleteDoc } from "firebase/firestore";
import config from "../config/firebase.config"
import { pick } from "lodash";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Get reference to user collection
const usersRef = collection(db, "users");

//Add new User
export const addUser = async (req: Request, res: Response) => {
    try {
        const user = pick(req.body, ['name', 'age', 'position', 'isPermanent']);
        const docRef = await addDoc(usersRef, user);
        console.log("Document written with ID: ", docRef.id);
        return res.send('New user added to DB.')
    } catch (e) {
        return res.status(400).send(e.message)
    }
}

//Get records of all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(usersRef);
        const records: any = [];
        querySnapshot.forEach((doc) => {
            records.push(doc.data());
        });
        return res.send({
            'users records': records
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
    return;
}

// Get user by Id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id

        const q = query(usersRef, where(documentId(), "==", userId));
        // const q = query(usersRef, where("isPermanent", "==", true));

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return res.send(`user with id ${userId} does not exists.`)
        }
        const userRecord = querySnapshot.docs[0].data();
        res.send({
            'User record': userRecord
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
    return;
}

// edit User records 
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const UpdatedUser = pick(req.body, ['name', 'age', 'position', 'isPermanent']);
        const q = query(usersRef, where(documentId(), "==", userId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return res.send(`user with id ${userId} does not exists.`)
        }
        //updateDoc can update single or multiple fields
        await updateDoc(doc(db, "users", userId), UpdatedUser);
        res.send('User record edited.')
    } catch (error) {
        res.status(400).send(error.message)
    }
    return;
}

// Delete User records 
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const querySnapshot = await getDocs(query(usersRef, where(documentId(), "==", userId)));
        if (querySnapshot.empty) {
            return res.send(`user with id ${userId} does not exists.`)
        }
        //deleteDoc delete a document if exists
        await deleteDoc(doc(db, "users", userId));
        res.send('User records Deleted.')
    } catch (error) {
        res.status(400).send(error.message)
    }
    return;
}

