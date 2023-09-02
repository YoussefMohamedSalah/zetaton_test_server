import { Request, Response } from "express";
import admin from "../firebase-service";

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
    // getAuthToken middleware
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken!);
            req.authId = userInfo.uid;
            return next();
        } catch (err) {
            console.log(err.message)
            return res.status(401).send({ error: 'Unauthorized' });
        }
    });
}