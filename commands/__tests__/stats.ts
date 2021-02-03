import WebSocket from "ws";
import {stats} from "../stats";

describe('Stats command', () => {
    it('sends message via socket', () => {
        const socket: WebSocket = ({
            send: jest.fn(),
        } as unknown as WebSocket)

        stats(socket, 2,[],['test']);

        expect(socket.send).toHaveReturnedTimes(1);
        expect(socket.send).toHaveBeenCalledWith(JSON.stringify([0, ['test'].join()]));
    })
});
