import WebSocket from 'ws';

class WebSocketServer {
    private wss: WebSocket.Server;
    constructor() {
        this.wss = new WebSocket.Server({port: 8080});
    }

    start() {
        this.wss.on('connection', ws => {
            console.log('ws', ws);
        })

    }
}

export default WebSocketServer;