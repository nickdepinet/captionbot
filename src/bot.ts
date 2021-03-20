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
const rec = new Vosk.Recognizer(model, 48000.0);

interface RecognizedResult {
    result: any[];
    text: string;
}

async function convert_audio(input: Buffer): Promise<Buffer> {
    try {
        // stereo to mono channel
        const data = new Int16Array(input)
        const ndata = new Int16Array(data.length/2)
        for (let i = 0, j = 0; i < data.length; i+=4) {
            ndata[j++] = data[i]
            ndata[j++] = data[i+1]
        }
        return Buffer.from(ndata);
    } catch (e) {
        console.log(e)
        console.log('convert_audio: ' + e)
        throw e;
    }
}

client.on('message', async message => {
    console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift()?.toLowerCase();
    const param = args.shift()?.toLowerCase();
    if (command === 'caption' && message.member?.voice.channel) {
        if (param === 'start') {
            const connection: VoiceConnection = await message.member.voice.channel.join();
            const audio: Readable = connection.receiver.createStream(message, { mode: 'pcm' });
            let chunks: any = [];
            audio.on('data', function(chunk) {
                console.log(`Received ${chunk.length} bytes of data.`);
                chunks.push(chunk);
            });
            audio.on('end', async () => {
                let buffer: Buffer = await convert_audio(Buffer.concat(chunks));
                let rStream: Readable = new Readable();
                rStream._read = () => {} // _read is required but you can noop it
                rStream.push(buffer)
                rStream.push(null)
                for await (const data of rStream) {
                    const end_of_speech = rec.acceptWaveform(data);
                    if (end_of_speech) {
                        console.log("partial: " + rec.result());
                    }
                }
                let result: RecognizedResult = JSON.parse(rec.finalResult(rec));
                message.channel.send(message.member?.user.username + ": " + result.text);
            });
        } else if (param === 'stop') {
            await message.member.voice.channel.leave();
        }
    }
});