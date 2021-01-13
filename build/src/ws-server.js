"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClientConnection = void 0;
const ws_1 = __importDefault(require("ws"));
const uuid_1 = require("uuid");
const market_data_service_1 = __importDefault(require("./services/market-data-service"));
class WebsocketClientConnection {
    constructor(ws, cliendId, messageCB) {
        this._ws = ws;
        this._clientId = cliendId;
        this._messageCB = messageCB;
        this._registerEvents();
    }
    _onMessage(message) {
        const msg = JSON.parse(message);
        msg.clientId = this._clientId;
        if (this._messageCB) {
            this._messageCB(msg);
        }
    }
    _registerEvents() {
        this._ws.on('message', this._onMessage.bind(this));
    }
    send(message) {
        this._ws.send({
            cliendId: this._clientId,
            data: message
        });
    }
}
exports.WebsocketClientConnection = WebsocketClientConnection;
class WebSocketServer {
    constructor() {
        this.wss = new ws_1.default.Server({ port: 8080 });
        this.marketDataService = new market_data_service_1.default();
        this.connections = [];
    }
    _onMessage(message) {
        console.log('the message', message);
        switch (message.event) {
            case 'marketdata':
                this.marketDataService.onSubscribe(message.clientId, [message.data.symbol]);
        }
    }
    start() {
        this.wss.on('connection', ws => {
            console.log('Websocket server connected');
            this.connections.push(new WebsocketClientConnection(ws, uuid_1.v4(), this._onMessage.bind(this)));
        });
    }
}
exports.default = WebSocketServer;
