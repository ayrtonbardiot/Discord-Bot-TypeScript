import Bot from "./bot";
import config from './config.json'

let bot: Bot;

bot = new Bot(config.token)