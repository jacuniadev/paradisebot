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
    @filename: commands/say.ts;

    All rights are reserved.
    =======================================
*/

import {Command} from "../types";

/**
 * Send message to in-game chat.
 * @param socket WebSocket instance.
 * @param invoker Player who invoked command (ID).
 * @param args Text to send.
 */
export const say: Command = (socket, invoker, _, args) => {
    if (args.length === 0)
        return socket.send(JSON.stringify([0, "Error: You didn't write anything"]));

    socket.send(JSON.stringify([0, `Player #${invoker} says: ${args.join(" ")}`]));
}