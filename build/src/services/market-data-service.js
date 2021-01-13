"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
class MarketDataService {
    constructor() {
        this._eventSources = new Map();
        this._eventSources = new Map();
    }
    onSubscribe(clientId, symbols) {
        let partialMessage;
        console.log('onSubscribe', clientId, symbols);
        const eventSource = request_1.default({
            url: `https://cloud-sse.iexapis.com/stable/stocksUS?symbols=${symbols[0]}&token=pk_97de960294e944268b4c0051b31e2adf`,
            headers: {
                'content-type': 'text/event-stream'
            }
        });
        eventSource.on('socket', msg => console.log('EVENT SOURCe OPENED'));
        eventSource.on('error', error => console.log('EVENT SOURCE ERROR', error));
        eventSource.on('data', response => {
            var chunk = response.toString();
            var cleanedChunk = chunk.replace(/data: /g, '');
            if (partialMessage) {
                cleanedChunk = partialMessage + cleanedChunk;
                partialMessage = "";
            }
            var chunkArray = cleanedChunk.split('\r\n\r\n');
            chunkArray.forEach(function (message) {
                if (message) {
                    try {
                        var quote = JSON.parse(message)[0];
                        console.log(quote);
                    }
                    catch (error) {
                        partialMessage = message;
                    }
                }
            });
        });
        this._eventSources.set(clientId, eventSource);
    }
}
exports.default = MarketDataService;
