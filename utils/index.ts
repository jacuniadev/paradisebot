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
    @filename: utils/index.ts;

    All rights are reserved.
    =======================================
*/

/**
 * Command prefix.
 */
export const commandPrefix = "#";

/**
 * Chacks if object is empty.
 * @param obj Any object.
 * @returns False if object isn't empty.
 */
export const isEmpty = (obj: Record<string, unknown>): boolean => {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
