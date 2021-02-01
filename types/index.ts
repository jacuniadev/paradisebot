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
 * @param stats Statistics from game server.
 * @param args Additional arguments.
 */
export type Command = (socket: WebSocket, stats: number[], args: string[]) => void
