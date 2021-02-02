import {Command, Handler, Server} from "../types";
import {commandPrefix} from '../utils'
import Commands from '../commands';

/**
 * Handler for getting players list.
 * @param server Server object.
 * @returns Socket message handler.
 */
export const handlePlayerList: (server: Server) =>  Handler<any[]> = (server) =>  (_, parsed) => {
    server.players = parsed[4] ? parsed[4] : [];

    console.log("Connected to server");
}

/**
 * Runs command if passed on chat
 * @param server Server object.
 * @param stats Player statistics.
 * @returns Socket message handler.
 */
export const handleWaitForCommand: (server: Server, stats: number[]) => Handler<any[]> = (
    server,
    stats,
) => (socket, parsed) => {
    const PLAYER_ID = parsed[1] ? parsed[1] : 0;
    const PLAYER_MESSAGE = parsed[2] ? parsed[2] : "none";

    if (!PLAYER_MESSAGE.startsWith(commandPrefix)) {
        for (const player of server.players) {
           if (player.i === PLAYER_ID)
                console.log(`[CHAT] ${player.n}: ${PLAYER_MESSAGE}`);
            else
                console.log(`[CHAT] unknown#${PLAYER_ID}: ${PLAYER_MESSAGE}`);
        }
        return;
    } 

    const args = PLAYER_MESSAGE.slice(commandPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase() as keyof typeof Commands;

    const command: Command = Commands[commandName];

    if (command)
        command(socket, stats, args);
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
export const handleBotDeath: () => Handler<Uint8Array> = () => () => console.log('Bot died');
