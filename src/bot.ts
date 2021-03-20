declare module 'vosk';

import { Client, VoiceConnection } from "discord.js";
import * as fs from "fs";
import { Readable } from "stream";
import * as Vosk from "vosk";
import * as config from "./.config.json";

const client = new Client();
const prefix = config.prefix;

client.once('ready', () => {
    console.log('Ready!');
});

var apiKey = config["discord-api-key"];
client.login(apiKey);

const model = new Vosk.Model("model");
const rec = new Vosk.Recognizer(model, 16000);

client.on('message', async message => {
    console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift()?.toLowerCase();
    const param = args.shift()?.toLowerCase();
    console.log(command);
    if (command === 'caption' && message.member?.voice.channel) {
        if (param === 'start') {
            const connection: VoiceConnection = await message.member.voice.channel.join();
            const audio: Readable = connection.receiver.createStream(message, { mode: 'pcm', end: 'manual' });
            const end_of_speech = rec.acceptWaveform(audio.read());
            message.channel.send(message.member.user.username + ": " + rec.partialResult());
            audio.on('data', function(chunk) {
                const end_of_speech = rec.acceptWaveForm(chunk);
                if (end_of_speech) {
                    message.channel.send(message.member?.user.username ?? 'Unknown User' + ": " + rec.result());
                }
            });
            
        } else if (param === 'stop') {
            await message.member.voice.channel.leave();
        }
    }
});