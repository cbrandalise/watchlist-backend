
import { Route } from '../types';
import {userCreate} from '../validation/user';
import { HTTPMethod } from '../types/enums';

import UserController from '../controllers/user';
import UserService from '../services/user';
import DB from '../db';



const routes = (database: DB): Route[] => {
    const userService = new UserService(database);
    const userController = new UserController(userService);
    return [
        {
            path: '/api/user',
            method: HTTPMethod.POST,
            handler: userController.create.bind(userController),
            validation: userCreate
        },
        {
            path: '/api/user',
            method: HTTPMethod.GET,
            handler: userController.findById.bind(userController),
            validation: () => {}
        }
    ]
};

export default routes;

