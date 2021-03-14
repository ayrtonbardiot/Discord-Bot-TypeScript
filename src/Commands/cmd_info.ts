import { Message, MessageEmbed } from "discord.js";

export function run(msg: Message): void {
    const embed: MessageEmbed = new MessageEmbed().addField('info', 'test')
    msg.channel.send(embed)
}

export const names: string[] = ['info', 'about']