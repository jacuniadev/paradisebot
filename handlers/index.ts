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
    @filename: handlers/index.ts;

    All rights are reserved.
    =======================================
*/

import {Command, Handler, Server} from "../types";
import {commandPrefix} from '../utils'
import Commands from '../commands';

/**
 * Handler for initializing connection.
 * @param server Server object.
 * @returns Socket message handler.
 */
export const handleConnection: (server: Server) => Handler<any[]> = (server) => (_, parsed) => {
    server.players = parsed[4] ? parsed[4] : [];

    console.log("Connected to server");
}

/**
 * Runs command if passed on chat
 * @param server Server object.
 * @param playerStats Player current statistics (health, food, water, temperature, overheat, air).
 * @returns Socket message handler.
 */
export const handleWaitForCommand: (server: Server, stats: number[]) => Handler<any[]> = (
    server,
    playerStats,
) => (socket, parsed) => {
    const PLAYER_ID = parsed[1] ? parsed[1] : 0;
    const PLAYER_MESSAGE = parsed[2] ? parsed[2] : "none";

    if (!PLAYER_MESSAGE.startsWith(commandPrefix)) {
        for (const player of server.players) {
            if (player.i === PLAYER_ID)
                return console.log(`[CHAT] ${player.n}: ${PLAYER_MESSAGE}`);
        }
        
        return console.log(`[CHAT] unknown${PLAYER_ID}: ${PLAYER_MESSAGE}`);
    } else {
        const invokerId = PLAYER_ID,
            args = PLAYER_MESSAGE.slice(commandPrefix.length).trim().split(/ +/),
            commandName = args.shift().toLowerCase() as keyof typeof Commands;

        const command: Command = Commands[commandName];

        if (command)
            command(socket, invokerId, playerStats, args), console.log(`[COMMANDS]: Player #${invokerId} invoked ${commandPrefix + commandName} command`)
        else
            socket.send(JSON.stringify([0, "Unknown command"])), console.log(`[COMMANDS]: Player #${invokerId} tried to invoke ${commandPrefix + commandName} command, but it dosen't exists`)
    }
}

/**
 * Timeout handler.
 * @returns Socket message handler.
 */
export const handleTimeout: () => Handler<Uint8Array> = () => () => {
    console.log("Server is full/Server timeout connection");
}

/**
 * Handle player statistics loading.
 * @param stats Player statistics.
 * @returns Socket message handler.
 */
export const handlePlayerStatistics: (stats: number[]) => Handler<Uint8Array> = (stats) => (_, parsed) => {
    parsed.slice(1).forEach((value,index) => stats[index+1] = value || 0);
}

/**
 * Handles bot death.
 * @returns Socket message handler.
 */
export const handleDeath: () => Handler<Uint8Array> = () => () => console.log(`Died at ${Date.now()}`);