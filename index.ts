import express from 'express';
import Server from './src/server';
import routes from './src/routes';
import WebSocketServer from './src/ws-server';

const app: express.Application = express();
app.use(express.json());
const PORT = 5000;


const server = new Server(app, routes, PORT);
server.start();

const wsServer = new WebSocketServer();
wsServer.start();


