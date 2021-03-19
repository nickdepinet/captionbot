import { Client, VoiceConnection } from "discord.js";
import * as config from "./.config.json";

const client = new Client();
const prefix = config.prefix;

client.once('ready', () => {
    console.log('Ready!');
});

var apiKey = config["discord-api-key"];
client.login(apiKey);

client.on('message', async message => {
    console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift()?.toLowerCase();
    const param = args.shift()?.toLowerCase();
    console.log(command);
    if (command === 'caption' && message.member?.voice.channel) {
        if (param === 'start') {
            const connection = await message.member.voice.channel.join();
        } else if (param === 'stop') {
            await message.member.voice.channel.leave();
        }
    }
});