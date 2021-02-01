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
    @filename: commands/say.ts;

    All rights are reserved.
    =======================================
*/

/*
    How to do the command?

    import {Command} from "../types";

    export const name: Command = (socket, stats, args) => { <-- Command code
            <!- THERE PUT THE CODE OF COMMAND -!>
        }

    and add to `commands/index.ts`

    import {name} from './name';

    and in same file

    export default {
        . <-- diffrent commands
        .
        .
        name,
    }
*/

import {Command} from "../types";

/**
 * Sand message to in-game chat.
 * @param socket WebSocket instance.
 * @param args Text to send.
 */
export const say: Command = (socket, _, args) => socket.send(JSON.stringify([0, args.join(" ")]));
