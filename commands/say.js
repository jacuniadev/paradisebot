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
    @filename: commands/say.js;

    All rights are reserved.
    =======================================
*/

/*
    How to do the command?

    module.exports = {
        name: "name", <-- Command name
        callback: (socket, stats, args) => { <-- Command code
            <!- THERE PUT THE CODE OF COMMAND -!>
        }
    }
*/

module.exports = {
    name: "say",
    callback: (socket, stats, args) => {
        return socket.send(JSON.stringify([0, args.join(" ")]));
    }
};