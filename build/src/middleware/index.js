"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerifyMiddleware = void 0;
const enums_1 = require("../types/enums");
const auth_1 = require("../utils/auth");
function jwtVerifyMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = auth_1.getTokenFromHeaders(req.headers);
        if (token) {
            try {
                const decoded = yield auth_1.jwtVerify(token);
                if (decoded) {
                    return next();
                }
            }
            catch (e) {
                return res.status(enums_1.HttpStatusCode.UNAUTHORIZED).json(e);
            }
        }
        res.status(enums_1.HttpStatusCode.UNAUTHORIZED).json({ error: "Unauthorized" });
    });
}
exports.jwtVerifyMiddleware = jwtVerifyMiddleware;
