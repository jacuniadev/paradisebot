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
    @author: thenbhd#0001, NNNP#4293;
    @filename: types/index.ts;

    All rights are reserved.
    =======================================
*/

import WebSocket from "ws";

/**
 * User information need for connection and bot operations.
 */
export type UserData = {
    token: string;
    tokenId?: string;
};

/**
 * Game Player object.
 */
type Player = {
    i: number;
    n: string;
};

/**
 * Server object configuration.
 */
export type Server = {
    players: Player[]
};

/**
 * Command function.
 * @param socket WebSocket instance.
 * @param stats Player statistic.
 * @param args Additional arguments.
 */
export type Command = (socket: WebSocket, stats: number[], args: string[]) => void

/**
 * Communication universal handler.
 * @param socket WebSocket instance.
 * @param parse Paramtrs from message.
 */
export type Handler<T> = (socket: WebSocket, parse: T) => void;

/**
 * Register handler param for JSON handler.
 */
export type RegisteredJSONHandler = {
    handlerType: "JSON";
    registrat: number;
    handler: Handler<any[]>;
}

/**
 * Register handler param for Uint handler.
 */
export type RegisteredUintHandler = {
    handlerType: "Uint";
    registrat: number;
    handler: Handler<Uint8Array>;
}
