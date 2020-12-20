import {body} from 'express-validator';

export const login = [
    body('email').isEmail().exists(),
    body('password').isString().exists()
];