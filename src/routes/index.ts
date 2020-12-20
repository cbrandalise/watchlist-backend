
import { Route } from '../types';
import { HTTPMethod } from '../types/enums';

import {userCreate} from '../validation/user';
import { login } from '../validation/auth';

import UserController from '../controllers/user';
import AuthController from '../controllers/auth';
import UserService from '../services/user';
import AuthenticationService from '../services/auth';

import DB from '../db';

const routes = (database: DB): Route[] => {
    const userService = new UserService(database);
    const authService = new AuthenticationService(database);
    const userController = new UserController(userService);
    const authController = new AuthController(authService);
    return [
        {
            path: '/api/user',
            method: HTTPMethod.POST,
            handler: userController.create.bind(userController),
            validation: userCreate
        },
        {
            path: '/api/user/:user_id',
            method: HTTPMethod.GET,
            handler: userController.findById.bind(userController),
            protected: true
        },
        {
            path: '/api/login',
            method: HTTPMethod.POST,
            handler: authController.login.bind(authController),
            validation: login
        }
    ]
};

export default routes;

