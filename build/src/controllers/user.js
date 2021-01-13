"use strict";
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
const controller_1 = __importDefault(require("./controller"));
const types_1 = require("../types");
const enums_1 = require("../types/enums");
class UserController extends controller_1.default {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, first_name, last_name, password, password_confirmation } = req.body;
            try {
                const user = yield this.userService.create(new types_1.UserDto(email, first_name, last_name, password, password_confirmation));
                res.status(enums_1.HttpStatusCode.CREATED).json(user);
            }
            catch (e) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: e });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.params;
            const user = yield this.userService.findOneById(user_id);
            res.status(enums_1.HttpStatusCode.OK).json(user);
        });
    }
    findByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const user = yield this.userService.findOneByEmail(email);
            if (user) {
                return res.status(enums_1.HttpStatusCode.OK).json(user);
            }
        });
    }
}
exports.default = UserController;
