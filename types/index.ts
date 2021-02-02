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
