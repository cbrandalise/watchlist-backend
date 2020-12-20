import { JwtData } from "../types";
import jwt from "jsonwebtoken";
import { resolve } from "path";

const SECRET = 'catmeow';

export function jwtSign(data: JwtData): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        jwt.sign(data, SECRET, (err, token) => {
            if (err) {
                return reject(err);
            }

            return resolve(token);
        });
    });
}

export function jwtVerify(token: string): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return reject (err);
            }

            return resolve(decoded);
        });
    });
}

export function getTokenFromHeaders(headers: any): string | null {
    if(headers && headers.authorization && headers.authorization.startsWith('Bearer ')) {
        const [bearer, token] = headers.authorization.split(' ');

        return token;
    }

    return null;
}