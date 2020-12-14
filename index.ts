import express from 'express';
import Server from './src/server';
import routes from './src/routes';

const app: express.Application = express();
app.use(express.json());
const PORT = 5050;


const server = new Server(app, routes, PORT);
server.start();

