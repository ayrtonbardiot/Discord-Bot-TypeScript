import { Message } from "discord.js";
import Bot from "../bot";
import config from '../config.json';

export const name: string = 'message'

export const once: boolean = false;

export function execute(msg: Message):void{
	if (!msg.content.startsWith(Bot._prefix) || msg.author.bot) return;

	const args: string[] = msg.content.slice(Bot._prefix.length).trim().split(/ +/);
	const command: string = args.shift()?.toLowerCase()!;
    const cmdd = Bot._commands.get(command);
    if (command != null) {
        if (msg.member?.hasPermission(cmdd.permission))
            cmdd?.run(msg, args)
        else
            msg.reply('tu n\'as pas le droit d\'utiliser cette commande !')
    }
}