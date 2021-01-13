"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../types/enums");
const user_1 = require("../validation/user");
const auth_1 = require("../validation/auth");
const user_2 = __importDefault(require("../controllers/user"));
const auth_2 = __importDefault(require("../controllers/auth"));
const user_3 = __importDefault(require("../services/user"));
const auth_3 = __importDefault(require("../services/auth"));
const routes = (database) => {
    const userService = new user_3.default(database);
    const authService = new auth_3.default(database);
    const userController = new user_2.default(userService);
    const authController = new auth_2.default(authService);
    return [
        {
            path: '/api/user',
            method: enums_1.HTTPMethod.POST,
            handler: userController.create.bind(userController),
            validation: user_1.userCreate
        },
        {
            path: '/api/user/:user_id',
            method: enums_1.HTTPMethod.GET,
            handler: userController.findById.bind(userController),
            protected: true
        },
        {
            path: '/api/login',
            method: enums_1.HTTPMethod.POST,
            handler: authController.login.bind(authController),
            validation: auth_1.login
        }
    ];
};
exports.default = routes;
