import { Message } from "discord.js";
import Bot from "../bot";
import config from '../config.json';
import Logger from "../Logger";

const prefix: string = config.prefix

export const name: string = 'ready'

export const once: boolean = false;

export function execute():void{
    new Logger().info(Bot._client.user?.username + ' prêt!')
}