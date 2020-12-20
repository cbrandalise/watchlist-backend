import {Request, Response, NextFunction} from 'express';
import { HttpStatusCode } from '../types/enums';
import { getTokenFromHeaders, jwtVerify } from '../utils/auth';

export async function jwtVerifyMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromHeaders(req.headers);
    
    if (token) {
        try {
            const decoded = await jwtVerify(token)
            if (decoded) {
                return next();
            }
        } catch (e) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json(e);
        }
    }

    res.status(HttpStatusCode.UNAUTHORIZED).json({error: "Unauthorized"});
}