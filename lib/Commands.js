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
    @filename: lib/Commands.js;

    All rights are reserved.
    =======================================
*/

const fs = require("fs");

class Commands {
    constructor() {
        this._totalLoaded = 0;

        this.commands = [];
        this.commandFiles = fs.readdirSync("./commands/").filter(command => command.endsWith(".js"));

        for (const commandFile of this.commandFiles) {
            const command = require(`../commands/${commandFile}`);

            if (command)
                console.log(`Command ${command.name} loaded`), this._totalLoaded++;

            this.commands.push({
                name: command.name,
                callback: command.callback
            });
        }

        console.log(`Loaded ${this._totalLoaded > 1 ? this._totalLoaded + " commands" : this._totalLoaded + " command"}`)
    }

    getCommands() {
        return this.commands;
    }

    getCommand(command) {
        for (const c of this.commands) {
            if (command === c.name)
                return c;
        }

        return null;
    }
}

module.exports = Commands;