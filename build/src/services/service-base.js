"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseService {
    constructor(database) {
        this.database = database;
    }
    get db() {
        return this.database;
    }
}
exports.default = BaseService;
