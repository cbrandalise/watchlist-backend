"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMiddlewareForRoute = void 0;
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const express_validator_1 = require("express-validator");
const db_1 = __importDefault(require("./db"));
const middleware_1 = require("./middleware");
const enums_1 = require("./types/enums");
function validationMiddleware(req, res, next) {
    const result = express_validator_1.validationResult(req);
    console.log('result', result);
    if (!result.isEmpty()) {
        res.status(422).json(result);
    }
    else {
        next();
    }
}
function generateMiddlewareForRoute(route) {
    let middleware = [];
    if (route.protected) {
        middleware.push(middleware_1.jwtVerifyMiddleware);
    }
    if (route.validation) {
        if (lodash_1.default.isArray(route.validation)) {
            middleware = [
                ...middleware,
                ...route.validation
            ];
        }
        else {
            middleware.push(route.validation);
        }
    }
    if (route.method === enums_1.HTTPMethod.POST) {
        middleware.push(validationMiddleware);
    }
    return middleware;
}
exports.generateMiddlewareForRoute = generateMiddlewareForRoute;
class Server {
    constructor(app, routes, port) {
        this.app = app;
        this.database = new db_1.default();
        this.routes = routes(this.database);
        this.port = port;
        this.router = express_1.default.Router();
        this.app.get('/test', (req, res) => { res.send('this shit works!'); });
    }
    registerRoutes() {
        this.routes.forEach(route => {
            let middleware = generateMiddlewareForRoute(route);
            switch (route.method) {
                case enums_1.HTTPMethod.GET:
                    this.router.get(route.path, middleware, route.handler);
                    break;
                case enums_1.HTTPMethod.POST:
                    this.router.post(route.path, middleware, route.handler);
                    break;
                case enums_1.HTTPMethod.PUT:
                    this.router.put(route.path, middleware, route.handler);
                    break;
                case enums_1.HTTPMethod.PATCH:
                    this.router.patch(route.path, middleware, route.handler);
                    break;
                case enums_1.HTTPMethod.DELETE:
                    this.router.delete(route.path, middleware, route.handler);
                    break;
                default:
                    throw `Error registering route route.method: ${route.method} was not handled`;
            }
        });
    }
    start() {
        this.registerRoutes();
        this.app.use('/', this.router);
        this.app.listen(this.port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
