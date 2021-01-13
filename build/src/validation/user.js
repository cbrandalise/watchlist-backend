"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreate = void 0;
const express_validator_1 = require("express-validator");
exports.userCreate = [
    express_validator_1.body('email').isEmail(),
    express_validator_1.body('first_name').isString().exists(),
    express_validator_1.body('last_name').isString().exists(),
    express_validator_1.body('password').isString().exists(),
    express_validator_1.body('password_confirmation').isString().exists()
];
