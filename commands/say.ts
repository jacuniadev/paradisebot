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

    export const name = (socket, stats, args) => { <-- Command code
            <!- THERE PUT THE CODE OF COMMAND -!>
        }

    and add to `commands/index.ts`

    export * from './name';
*/

/**
 * Sand message to in-game chat.
 */
export const say = (socket, stats, args) => socket.send(JSON.stringify([0, args.join(" ")]));
