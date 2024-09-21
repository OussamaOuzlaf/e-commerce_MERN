import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { ExtendRequest } from "../Types/extendedRequest";


export const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get('authorization');
    if (!authorizationHeader) {
        res.status(403).send("Authorization header was not provided!");
        return;
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        res.status(403).send("Bearer token not found");
        return;
    }

    jwt.verify(token, "jFA+m)9pyn(V>y<*aWD.1EY9+{#J4e$w", async (err, payload) => {
        if (err) {
            res.status(403).send("Invalid token")
        }
        if (!payload) {
            res.status(403).send("Invalid token payload")
        }

        const userPayload = payload as {
            email: string;
            firstName: string;
            lastName: string;
        }
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    });
}