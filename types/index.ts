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
