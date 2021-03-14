import { Client, Collection, DiscordAPIError, Message } from "discord.js";
import Logger from "./Logger";
import { readdir, readdirSync } from "fs"
import config from './config.json'

export default class Bot {

    private _token: string;
    static _client: Client;
    private _eventFiles: string[];
    static  _prefix: string; 
    static  _commands: Collection<string, any>;

    constructor(token: string){
        this._token = token;
        Bot._client = new Client();
        Bot._commands = new Collection();
        Bot._prefix = config.prefix;
        this._eventFiles = readdirSync('./src/Events').filter((file: string) => file.endsWith('.ts'))
        this.registerCommands();
        this.registerEvents();
        this.init();
    }

    private init(): void {
        Bot._client.login(this._token);
    }

    private registerCommands(): void {
        readdir('./src/Commands', (err, files) => {
            if(err) throw err;
            files.filter(file => file.endsWith('.ts')).forEach((file: string) => {
                const cmd = require(`./Commands/${file}`);
                cmd.names.forEach((name: string) => {
                    Bot._commands.set(name, cmd)
                });
            })
        })
    }

    private registerEvents(): void {
        for(const eventFile of this._eventFiles){
            const ev = require(`./Events/${eventFile}`)
            if(ev.once) {
                Bot._client.once(ev.name, (...args) => ev.execute(...args))
            } else {
                Bot._client.on(ev.name, (...args) => ev.execute(...args))
            }
        }
    }

}