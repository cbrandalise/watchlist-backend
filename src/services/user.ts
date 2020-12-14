import User from "../models/user";
import BaseService from "./service-base";
import * as knex from 'knex';
import DB from '../db';
import Knex from "knex";
import * as bcrypt from 'bcrypt';
import { UserDto } from "../types";

class UserService extends BaseService {
    constructor(database: DB) {
        super(database);
    }

    create(userDto: UserDto): Promise<User> {
        return this.db.tx(async (trx: knex.Transaction) => {
            const {email, firstName, lastName, password, passwordConfirmation} = userDto;
            
            const row = await trx.insert({ email, first_name: firstName, last_name: lastName }).into('user').returning('*');
            
            const { user_id, email: email_1, first_name, last_name } = row[0];
            let newUser: User = new User(user_id, email_1, first_name, last_name);
            
            const hash = await bcrypt.hash(password, 10);
            await trx.insert({ user_id: newUser.userId, hash: hash, salt: 'fsfda' }).into('password');
            
            return newUser;
        })
        
    }

    findOneById(id: string): Promise<User> | null {
        return null;
    }

    findOneByEmail(email: string): Promise<User> | null {
        return null;
    }

    deleteById(id: string) {

    }
}

export default UserService;