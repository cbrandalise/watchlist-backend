"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./src/server"));
const routes_1 = __importDefault(require("./src/routes"));
const ws_server_1 = __importDefault(require("./src/ws-server"));
const app = express_1.default();
app.use(express_1.default.json());
const PORT = 5050;
const server = new server_1.default(app, routes_1.default, PORT);
server.start();
const wsServer = new ws_server_1.default();
wsServer.start();
