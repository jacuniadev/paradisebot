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

/*
    How to do the command?

    First you're need to import the types.
    import {Command} from "../types";

    Nextly you're need to make constant export function.

    Example:
    export const name: Command = (socket, playerStats, args) => {
        <!- THERE PUT THE CODE OF COMMAND -!>
    }

    Then add command import in main (commands/index.ts) file responsible for running the commands, you're need add an import to command.

    Example:
    import {name} from './name';

    And in the main file responsible of running the commands, you just need to add the command name.
    export default {
        . <-- diffrent commands
        .
        .
        name,
    }
*/

import {Command} from "../types";

/**
 * Send message to in-game chat.
 * @param socket WebSocket instance.
 * @param args Text to send.
 */
export const say: Command = (socket, _, args) => socket.send(JSON.stringify([0, args.join(" ")]));
