import { EventEmitter } from 'events';
import EventSource from 'eventsource';
import { WebsocketClientConnection } from '../ws-server';

class MarketDataService extends EventEmitter {
    private _instrumentMarketDataConnection: Map<string, MarketDataConnection> = new Map();
    constructor() {
        super();
    }
    
    public onSubscribe(clientConnection: WebsocketClientConnection, instrument: string): void {
        const {clientId} = clientConnection;
        let marketDataConnection = this._instrumentMarketDataConnection.get(instrument);

        if (!marketDataConnection) {
            const eventSource = new EventSource(`https://sandbox-sse.iexapis.com/stable/stocksUS?symbols=${instrument}&token=Tpk_9155d43657cd4b9595970fc261e93623`);
            eventSource.onopen = msg => {
                console.log('EventSource opened');
            }
    
            eventSource.onmessage = msg => {
                try {
                    const quote = JSON.parse(msg.data)[0];
                    // console.log('symbol:', quote.symbol, 'last:', quote.latestPrice, 'change:', quote.change, 'volume:', quote.volume);
                    this.emit('marketData:update', quote);
                } catch (e) {
                    console.log('unable to parse msg:', e.message);
                }
            }
    
            eventSource.onerror = err => {
                console.log('error', err);
            }

            marketDataConnection = new MarketDataConnection(instrument, eventSource);
    
            this._instrumentMarketDataConnection.set(instrument, marketDataConnection);
        }

        if(!marketDataConnection.hasClient(clientId)) {
            marketDataConnection.addClient(clientId);
        }
    }
}

class MarketDataConnection {
    private _clientIds: Set<string>;
    private _instrument: string;
    
    private _connection: EventSource;

    constructor(instrument: string, connection: EventSource) {
        this._clientIds = new Set();
        this._instrument = instrument;
        this._connection = connection;

        
    }

    public get instrument(): string {
        return this._instrument;
    }

    public hasClient(clientId: string): boolean {
        return this._clientIds.has(clientId);
    }
 
    public addClient(clientId: string) {
        this._clientIds.add(clientId);
    }

    public removeClient(clientId: string): void {
        this._clientIds.delete(clientId);
    }
}

export default MarketDataService