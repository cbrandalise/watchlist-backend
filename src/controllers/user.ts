import express from 'express';
import Controller from './controller';
import UserService from '../services/user';
import { UserDto } from '../types';
import { HttpStatusCode } from '../types/enums';

class UserController extends Controller {
    private userService: UserService;
    constructor(userService: UserService) {
        super();
        this.userService = userService;
    }

    async create(req: express.Request, res: express.Response) {
        const {email, first_name, last_name, password, password_confirmation} = req.body;
        try {
            const user = await this.userService.create(new UserDto(email, first_name, last_name, password, password_confirmation));
            res.status(HttpStatusCode.CREATED).json(user);
        } catch (e) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: e});
        }
    }

    async findById(req: express.Request, res: express.Response) {
        const {user_id} = req.params;
        const user = await this.userService.findOneById(user_id);
        res.status(HttpStatusCode.OK).json(user);
    }

    async findByEmail(req: express.Request, res: express.Response) {
        const {email} = req.params;
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            return res.status(HttpStatusCode.OK).json(user);
        }
    }
}

export default UserController;