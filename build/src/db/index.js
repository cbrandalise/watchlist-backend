"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
class DB {
    constructor() {
        this.knex = knex_1.default({
            client: "postgresql",
            connection: {
                database: "watchlistadb",
                user: "postgres",
                password: "root"
            },
            pool: {
                min: 2,
                max: 10
            }
        });
    }
    get query() {
        return this.knex;
    }
    tx(cb) {
        return this.knex.transaction(cb);
    }
}
exports.default = DB;
