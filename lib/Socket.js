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
    @filename: lib/Socket.js;

    All rights are reserved.
    =======================================
*/

const WebSocket = require("ws");

const Game = require("./Game");

class Socket extends Game {
    constructor(secure, address, token, tokenId) {
        super();

        if (!secure || typeof secure !== "boolean")
            throw new Error("Starve.io servers are secure (it uses SSL protocols). Please switch secure argument to 'true'");
        else if (!address || !token)
            throw new Error(`Argument '${!address ? "address" : !token ? "token" : ""}' is empty`);

        this.socket = new WebSocket(`${secure ? "wss" : "ws"}://${address}`, {headers: {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"}});
        this.socket.binaryType = "arraybuffer";

        this.socket.onopen = () => this.socket.send(JSON.stringify(["pdbot.js", 2120, 1400, this.version, token ? token : "", tokenId ? tokenId : "", 0, 0, 0, 0, 0, 1, 0, null, null, null]));
        this.socket.onerror = () => {};
    }

    getSocketInstance() {
        return this.socket || null;
    }
}

module.exports = Socket;