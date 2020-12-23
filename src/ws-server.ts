import WebSocket from 'ws';
import {v4 as uuidv4} from 'uuid';

export class WebsocketClientConnection {
    private _ws: WebSocket;
    private _clientId: string;
    private _messageCB: (message: string) => void;
    constructor(ws: WebSocket, cliendId:string, messageCB: (message:string) => void) {
        this._ws = ws;
        this._clientId = cliendId;
        this._messageCB = messageCB;
        this._registerEvents();
    }

    private _onMessage(message: any) {
        this._ws.send('hello' + message);
        if(this._messageCB) {
            this._messageCB(message);
        }
    }

    private _registerEvents() {
        this._ws.on('message', this._onMessage.bind(this));
    }

    public send(message: any) {
        this._ws.send({
            cliendId: this._clientId,
            data: message
        });
    }
}

class WebSocketServer {
    private wss: WebSocket.Server;
    private connections: WebsocketClientConnection[];
    constructor() {
        this.wss = new WebSocket.Server({port: 8080});
        this.connections = [];
    }

    private _onMessage(message: any): void {
    }

    start() {
        this.wss.on('connection', ws => {
            console.log('Websocket server connected');
            this.connections.push(new WebsocketClientConnection(ws, uuidv4(), this._onMessage.bind(this)));
        });
    }
}

export default WebSocketServer;