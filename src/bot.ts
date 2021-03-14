import { Client, Collection, DiscordAPIError, Message } from "discord.js";
import Logger from "./Logger";
import { readdir } from "fs"
import config from './config.json'

export default class Bot {

    private _token: string;
    private _client: Client;
    private _logger: Logger;
    private _prefix: string;
    private _commands: Collection<string, any>;

    constructor(token: string){
        this._token = token;
        this._client = new Client();
        this._logger = new Logger();
        this._prefix = config.prefix;
        this._commands = new Collection();
        this.registerCommands();
        this.init();
    }

    private init(): void {
        this._client.on('ready', () => {
            this._logger.info(this._client.user?.username + " prêt !")
        })
        this._client.on('message', msg => {
            if(msg.content.startsWith(this._prefix)){
                const cmd = this._commands.get('info');
                cmd?.run(msg)
            }


        })
        this._client.login(this._token);
    }

    private registerCommands(): void {
        readdir('./src/Commands', (err, files) => {
            if(err) throw err;
            files.filter(file => file.endsWith('.ts')).forEach((file: string) => {
                const cmd = require(`./Commands/${file}`);
                cmd.names.forEach((name: string) => {
                    this._commands.set(name, cmd)
                });
                //this._commands.set(cmd.name, cmd);
            })
        })
    }

}