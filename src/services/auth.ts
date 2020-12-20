import DB from "../db";
import BaseService from "./service-base";

class AuthenticationService extends BaseService {
    constructor(database: DB) {
        super(database);
    }

    async findUserCredentialsByEmail(email: string) {
        const credentials = await this.db.query('user')
            .join('password', 'user.user_id', '=', 'password.user_id')
            .select('user.user_id', 'user.email', 'password.hash')
            .where('user.email', email)
            .first();

        return credentials;
    }
}

export default AuthenticationService;