import WebSocket from 'ws';
import {v4 as uuidv4} from 'uuid';
import MarketDataService from './services/market-data-service';

export class WebsocketClientConnection {
    private _ws: WebSocket;
    private _clientId: string;
    private _messageCB: (message: string, clientConnection: WebsocketClientConnection) => void;
    constructor(ws: WebSocket, cliendId:string, messageCB: (message:string, clientConnection: WebsocketClientConnection) => void) {
        this._ws = ws;
        this._clientId = cliendId;
        this._messageCB = messageCB;
        this._registerEvents();
    }

    private _onMessage(message: any) {
        const msg = JSON.parse(message);
        msg.clientId = this._clientId;
        if (this._messageCB) {
            this._messageCB(msg, this);
        }
    }

    private _registerEvents() {
        this._ws.on('message', this._onMessage.bind(this));
    }

    public send(message: any) {
        this._ws.send(JSON.stringify({
            cliendId: this._clientId,
            data: message
        }));
    }

    public get clientId(): string {
        return this._clientId;
    }
}

class WebSocketServer {
    private wss: WebSocket.Server;
    private connections: WebsocketClientConnection[];
    private marketDataService: MarketDataService;
    constructor() {
        this.wss = new WebSocket.Server({port: 8080});
        this.marketDataService = new MarketDataService();
        this.connections = [];

        this.marketDataService.on('marketData:update', data => {
            console.log('marketDataUpdate!!!', data);
        });
    }

    private _onMessage(message: any, clientConnection: WebsocketClientConnection): void {
        switch (message.event) {
            case 'marketdata':
                this.marketDataService.onSubscribe(clientConnection, message.data.symbol);
        }
    }

    start() {
        this.wss.on('connection', ws => {
            console.log('⚡️[ws-server]: Websocket server connected');
            this.connections.push(new WebsocketClientConnection(ws, uuidv4(), this._onMessage.bind(this)));
        });
    }
}

export default WebSocketServer;