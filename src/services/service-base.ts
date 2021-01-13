import { EventEmitter } from 'events';
import DB from '../db';

class BaseService {
    private database: DB;
    constructor(database: DB) {
        this.database = database;
    }

    get db() {
        return this.database;
    }
}

export default BaseService;