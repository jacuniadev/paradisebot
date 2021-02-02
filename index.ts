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
import * as Utils from './utils';
import {Server, UserData} from './types';
import {
    handleDeath,
    handleConnection,
    handlePlayerStatistics, 
    handleTimeout,
    handleWaitForCommand,
} from './handlers';

function Bot(address: string, userData: UserData) {
    if (!address)
        throw new Error(`Argument ${address ? "" : "address"} is required`);

    if (typeof userData !== "object")
        throw new Error("Argument userData is not an object");

    if (!userData || Utils.isEmpty(userData))
        throw new Error("Argument userData is required")

    const socket = new Socket(
        true,
        address,
        userData.token,
        userData.tokenId,
    );

    const server: Server = {
        players: []
    };

    const stats: number[] = [];

    socket.registerHandler({
        handlerType: "JSON",
        registrat: 3,
        handler: handleConnection(server),
    })

    socket.registerHandler({
        handlerType: 'JSON',
        registrat: 0,
        handler: handleWaitForCommand(server, stats),
    })

    socket.registerHandler({
        handlerType: 'Uint',
        registrat: 5,
        handler: handleTimeout(),
    });

    socket.registerHandler({
        handlerType: 'Uint',
        registrat: 16,
        handler: handlePlayerStatistics(stats),
    });

    socket.registerHandler({
        handlerType: 'Uint',
        registrat: 25,
        handler: handleDeath(),
    });
}

Bot("server747.starve.io", {
    token: "znQo87B<muWx\0"
});
