import { Message, MessageEmbed, PermissionResolvable } from "discord.js";

export function run(msg: Message, args: string[]): void {
    const embed: MessageEmbed = new MessageEmbed().addField('info', 'test')
    msg.channel.send(embed)
}

export const names: string[] = ['info', 'about']

export const permission: PermissionResolvable = 'SEND_MESSAGES'; // if user has this permission, command will execute