import jwt from 'jsonwebtoken';
import {createError} from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("You need to Login first.");

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return res.status(403).json("Token is not valid.")
        req.user = user
        next()
    });
    };