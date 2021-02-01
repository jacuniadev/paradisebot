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

import Game from "./Game";

class Socket extends Game {
    private socket: WebSocket;

    constructor(secure: boolean, address: string, token: string, tokenId: string) {
        super();

        if (!secure)
            throw new Error("Starve.io servers are secure (it uses SSL protocols). Please switch secure argument to 'true'");

        if (!address || !token)
            throw new Error(`Argument '${!address ? "address" : !token ? "token" : ""}' is empty`);

        this.socket = new WebSocket(`${secure ? "wss" : "ws"}://${address}`, {headers: {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"}});
        this.socket.binaryType = "arraybuffer";

        this.socket.onopen = () => this.socket.send(JSON.stringify(["pdbot.js", 2120, 1400, this.version, token ? token : "", tokenId ? tokenId : "", 0, 0, 0, 0, 0, 1, 0, null, null, null]));
        this.socket.onerror = () => {};
    }

    get socketInstance(): WebSocket | null {
        return this.socket || null;
    }
}

export default Socket;
