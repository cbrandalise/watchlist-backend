"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_validator_1 = require("express-validator");
exports.login = [
    express_validator_1.body('email').isEmail().exists(),
    express_validator_1.body('password').isString().exists()
];
