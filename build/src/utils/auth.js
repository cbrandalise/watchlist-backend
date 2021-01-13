"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromHeaders = exports.jwtVerify = exports.jwtSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = 'catmeow';
function jwtSign(data) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(data, SECRET, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });
}
exports.jwtSign = jwtSign;
function jwtVerify(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    });
}
exports.jwtVerify = jwtVerify;
function getTokenFromHeaders(headers) {
    if (headers && headers.authorization && headers.authorization.startsWith('Bearer ')) {
        const [bearer, token] = headers.authorization.split(' ');
        return token;
    }
    return null;
}
exports.getTokenFromHeaders = getTokenFromHeaders;
