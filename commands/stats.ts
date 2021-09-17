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
 * Send current bot statistics message in-game.
 * @param socket WebSocket instance.
 * @param stats Bot statistics.
 */
export const stats: Command = (socket, __, stats, _) => {
    if (!stats || stats.length === 0)
        return socket.send(JSON.stringify([0, "Error: Waiting for statistics data"]))

    const health = stats[1],
        food = stats[2],
        temperature = stats[3],
        water = stats[4],
        air = stats[5],
        heat = stats[6];

    socket.send(JSON.stringify([0, `HP: ${health}%, F: ${food}%, Water: ${water}%, Air: ${air}%, Temp: ${temperature}%, Heat: ${heat}%`]));
}