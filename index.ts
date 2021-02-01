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
    @filename: index.ts;

    All rights are reserved.
    =======================================
*/
import Socket from './lib/Socket';
import Commands from './commands';
import * as Utils from './utils';
import {UserData} from './types';

function Bot(address: string, userData: UserData) {
    if (!address)
        throw new Error(`Argument ${address ? "" : "address"} is required`);

    if (!userData || typeof userData !== "object")
        throw new Error(typeof userData !== "object" ? "Argument userData is not an object" : Utils.isEmpty(userData) ? "Argument userData is required" : "");

    const socket = new Socket(
        true,
        address,
        userData.token,
        userData.tokenId,
    ).socketInstance;

    this.server = {
        players: []
    };
    this.stats = [];

    if (socket) 
        socket.onmessage = message => {
            let parsed;

            switch (typeof message.data) {
                case "string":
                    parsed = JSON.parse(message.data);

                    switch (parsed[0]) {
                        case 0:
                            const PLAYER_ID = parsed[1] ? parsed[1] : 0,
                                PLAYER_MESSAGE = parsed[2] ? parsed[2] : "none";

                            if (!PLAYER_MESSAGE.startsWith(Utils.commandPrefix)) {
                                for (const player of this.server.players) {
                                   if (player.i === PLAYER_ID)
                                        console.log(`[CHAT] ${player.n}: ${PLAYER_MESSAGE}`);
                                    else
                                        console.log(`[CHAT] unknown#${PLAYER_ID}: ${PLAYER_MESSAGE}`);
                                }
                                return;
                            } else {
                                const args = PLAYER_MESSAGE.slice(Utils.commandPrefix.length).trim().split(/ +/),
                                    commandName = args.shift().toLowerCase() as keyof typeof Commands;

                                const command = Commands[commandName];

                                if (command)
                                    command(socket, this.stats, args);
                            };
                            break;
                        case 3:
                            this.server.players = parsed[4] ? parsed[4] : [];

                            console.log("Connected to server");
                            break;
                    }
                    break;
                case "object":
                    parsed = new Uint8Array(message.data);

                    switch (parsed[0]) {
                        case 5:
                            console.log("Server is full/Server timeout connection");
                            break;
                        case 16:
                            for (let i = 1; i < parsed.length - 1; i++)
                                this.stats[i] = parsed[i] || 0;
                            break;
                        case 25:
                            console.log("Bot died");
                            break;
                    }
                    break;
            }
        }
}

new Bot("server747.starve.io", {
    token: "znQo87B<muWx\0"
});
