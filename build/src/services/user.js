"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const service_base_1 = __importDefault(require("./service-base"));
const bcrypt = __importStar(require("bcrypt"));
class UserService extends service_base_1.default {
    constructor(database) {
        super(database);
    }
    create(userDto) {
        return this.db.tx((trx) => __awaiter(this, void 0, void 0, function* () {
            const { email, firstName, lastName, password, passwordConfirmation } = userDto;
            const row = yield trx.insert({ email, first_name: firstName, last_name: lastName }).into('user').returning('*');
            const { user_id, email: email_1, first_name, last_name } = row[0];
            let newUser = new user_1.default(user_id, email_1, first_name, last_name);
            const hash = yield bcrypt.hash(password, 10);
            yield trx.insert({ user_id: newUser.userId, hash: hash, salt: 'fsfda' }).into('password');
            return newUser;
        }));
    }
    findOneById(user_id) {
        return this.db.query
            .select('*')
            .from('user')
            .where({ user_id })
            .first();
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query
                .select('*')
                .from('user')
                .where('email', email);
            if (result.length) {
                const { user_id, email, first_name, last_name } = result[0];
                return new user_1.default(user_id, email, first_name, last_name);
            }
            return null;
        });
    }
    deleteById(id) {
    }
}
exports.default = UserService;
