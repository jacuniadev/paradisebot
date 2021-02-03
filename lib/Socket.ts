/*
            ooo      ooooooo          
        ooMMMMMMoooooMMMMMMMMMoo      
        oooMMMMMMMMMMM MMMMMMMMMMMo    
        oMMMMMMMMMMMMoMMMMMMMMMMMMM   
        MMMM MMoMMMMMM oMMMMMMMMMMMM  
        MM oMMoMMMMoMMMoMMMMMMMMMMMo 
            MM MMMMMMMMMMMMMMMMMMMMMM 
            oMM    MMMMMMMMMMoMMMMMMMM 
            MMMo   oMMMMMMMooooMMMMMM  
            MMMMMo    MMMoooMMMMMMMMM  
            MMMMMMMoMMooMMMMMMMMMMM   
            oMMMMMMMMMMMMMMMMMMMo    
                oMMMMMMMMMMMMMMoo      
                    oooo oo     

    =======================================         
    @project: Paradise BOT;
    @author: WH1T3R0S3 SQUAD (thenbhd#0001);
    @filename: lib/Socket.ts;

    All rights are reserved.
    =======================================
*/

import WebSocket from "ws";
import {Handler, RegisteredJSONHandler, RegisteredUintHandler} from "../types";

import Game from "./Game";

class Socket extends Game {
    private socket: WebSocket;
    private JSONHandlers: Map<number, Handler<any[]>>;
    private UintHandlers: Map<number, Handler<Uint8Array>>;

    /**
     * Handler for Uint communictation.
     * @param data Message data as string.
     */
    private handleUintCommunication = (data: ArrayBuffer) => {
        const array = new Uint8Array(data);
        
        const handler = this.UintHandlers.get(array[0])
        
        if (handler && this.socketInstance)
            handler(this.socketInstance, array);
    }

    /**
     * Handler for JSON communictation.
     * @param data Message data as string.
     */
    private handleJSONCommunication = (data: string) => {
        const json: [number, ...any[]] = JSON.parse(data);
        
        const handler = this.JSONHandlers.get(json[0])
        
        if (handler && this.socketInstance)
            handler(this.socketInstance, json);
    }

    /**
     * Handler for WebSocket message Event.
     * @param message WebSocket message object.
     */
    private handleMessage = ({data}: WebSocket.MessageEvent) => {
        if (typeof data === "string")
            this.handleJSONCommunication(data);

        if (data instanceof ArrayBuffer) 
            this.handleUintCommunication(data);
    };

    constructor(secure: boolean, address: string, token: string, tokenId?: string) {
        super();

        if (!secure)
            throw new Error("Starve.io servers are secure (it uses SSL protocols). Please switch secure argument to 'true'");

        if (!address || !token)
            throw new Error(`Argument '${!address ? "address" : !token ? "token" : ""}' is empty`);

        this.socket = new WebSocket(`${secure ? "wss" : "ws"}://${address}`, {headers: {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"}});
        this.socket.binaryType = "arraybuffer";

        this.socket.onopen = () => this.socket.send(JSON.stringify(["pdbot.js", 2120, 1400, this.version, token, tokenId ? tokenId : "", 0, 0, 0, 0, 0, 1, 0, null, null, null]));
        this.socket.onerror = () => ({});
        this.socket.onmessage = this.handleMessage;
        
        this.JSONHandlers = new Map();
        this.UintHandlers = new Map();
    }

    /**
     * Register handler for socket message.
     * @param registeredHandler Object need to register handler for WebSocket message.
     */
    public registerHandler(registeredHandler: RegisteredJSONHandler | RegisteredUintHandler): void {
        if (
            registeredHandler.handlerType === "JSON" 
            && !this.JSONHandlers.has(registeredHandler.registrat)
        ) {
            this.JSONHandlers.set(registeredHandler.registrat, registeredHandler.handler);
        }

        if (
            registeredHandler.handlerType === "Uint"
            && !this.UintHandlers.has(registeredHandler.registrat)
        ) {
            this.UintHandlers.set(registeredHandler.registrat, registeredHandler.handler);
        }
    }

    get socketInstance(): WebSocket | null {
        return this.socket || null;
    }
}

export default Socket;
