import express from 'express';
import * as bcrypt from 'bcrypt';

import UserService from "../services/user";
import Controller from "./controller";
import { HTTPMethod, HttpStatusCode } from "../types/enums";
import AuthenticationService from '../services/auth';
import { jwtSign } from '../utils/auth';

export default class AuthController extends Controller {
    private authService: AuthenticationService;
    constructor(authService: AuthenticationService) {
        super();
        this.authService = authService;
    }

    async login(req: express.Request, res: express.Response) {
        const {email, password} = req.body;

        const credentials = await this.authService.findUserCredentialsByEmail(email);
        
        if (credentials && credentials.hash) {
            if (await bcrypt.compare(password, credentials.hash)) {
                const token = await jwtSign({email, user_id: credentials.user_id});
                return res.status(HttpStatusCode.OK).json({user_id: credentials.user_id, token});
            };
        }

        res.status(HttpStatusCode.FORBIDDEN).json({error: 'NOT AUTHORIZED'});
    }
}