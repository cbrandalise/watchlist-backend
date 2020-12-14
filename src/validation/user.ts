import {body} from 'express-validator';

export const userCreate = [
    body('email').isEmail(),
    body('first_name').isString().exists(),
    body('last_name').isString().exists(),
    body('password').isString().exists(),
    body('password_confirmation').isString().exists()
];