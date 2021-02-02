import WebSocket from "ws";
import {say} from "../say";

describe('Say command', () => {
    it('sends message via socket', () => {
        const socket: WebSocket = ({
            send: jest.fn(),
        } as unknown as WebSocket)

        say(socket,[],['test']);

        expect(socket.send).toHaveReturnedTimes(1);
        expect(socket.send).toHaveBeenCalledWith(JSON.stringify([0, ['test'].join()]));
    })
});
