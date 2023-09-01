import admin from "../firebase-service";
import { Request, Response } from "express";

// authToken does not exist in Request interface
// so i will make my own interface extending Request interface
// and add authToken property to it
interface RequestWithAuthToken extends Request {
    authToken?: string | null;
    authId?: string;
}


const getAuthToken = (req: RequestWithAuthToken, res: Response, next: any) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        req.authToken! = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
}

export const checkAuth = async (req: RequestWithAuthToken, res: Response, next: any) => {
    // calling getAuthToken middleware
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken!);
            req.authId = userInfo.uid;
            return next();
        } catch (err) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
    });
}