import express from 'express';
import { validationResult } from 'express-validator';
import { nextTick } from 'process';
import DB from './db';
import { Route } from './types';
import { HTTPMethod } from './types/enums';

function validationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const result = validationResult(req);
    console.log('result', result);
    if (!result.isEmpty()) {
        res.status(422).json(result);
    } else {
        next();
    }
}

class Server {
    private router: express.Router;
    private app: express.Application;
    private routes: Route[];
    private port: number;
    private database: DB;

    constructor(app: express.Application, routes: (database: DB) => Route[], port: number) {
        this.app = app; 
        this.database = new DB();
        this.routes = routes(this.database);
        this.port = port;
        this.router = express.Router()

        this.app.get('/test', (req, res) => {res.send('this shit works!')})
    }

    private registerRoutes(): void {
        this.routes.forEach(route => {
            switch (route.method) {
                case HTTPMethod.GET:
                    this.router.get(route.path, route.handler);     
                    break;
                case HTTPMethod.POST:
                    this.router.post(route.path, [...route.validation, validationMiddleware], route.handler);
                    break;
                case HTTPMethod.PUT:
                    this.router.put(route.path, route.validation, route.handler);
                    break;
                case HTTPMethod.PATCH:
                    this.router.patch(route.path, route.validation, route.handler);
                    break;
                case HTTPMethod.DELETE:
                    this.router.delete(route.path, route.validation, route.handler);
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

export default Server;