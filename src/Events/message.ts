import { Message } from "discord.js";
import Bot from "../bot";
import config from '../config.json';

export const name: string = 'message'

export const once: boolean = false;

export function execute(msg: Message):void{
    if(msg.content.startsWith(Bot._prefix)){
        const cmdtxt: string = msg.content.split(Bot._prefix)[1]
        const command = Bot._commands.get(cmdtxt);
        command?.run(msg)
    }
}