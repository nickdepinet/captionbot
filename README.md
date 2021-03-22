# captionbot
Discord bot for captioning voice chats

[![build and deploy to Azure - discordcaptionbot](https://github.com/nickdepinet/captionbot/actions/workflows/main_discordcaptionbot.yml/badge.svg)](https://github.com/nickdepinet/captionbot/actions/workflows/main_discordcaptionbot.yml)

# Setup

1) Register your bot with discord, obtain a bot API key, and invite the bot to your server.

2) Create your configuration file, .env - this contains your API key and command prefix

    ```
    DISCORD_API_KEY=discord_api_key_here
    PREFIX=#!
    ```
3) Download the vosk voice recognition model unzip, and copy to the root captionbot folder
    ```
    wget http://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
    unzip vosk-model-small-en-us-0.15.zip
    mv vosk-model-small-en-us-0.15 model
    ```
4) Install nodejs 14.16 LTS from https://nodejs.org
5) Install dependencies with npm install
    Note: On Windows, there's a problem with the vosk npm bindings, you need to copy the following dlls into your PATH:
    ```
    libgcc_s_seh-1.dll
    libstdc++-6.dll
    libvosk.dll
    libwinpthread-1.dll
    ```
    These files reside in `captionbot/node_modules/vosk/lib/win-x86_64`
6) Build and run the bot
    ```
    npm start
    ```

# Usage
With the bot added to your server, give the bot a role with proper permissions to join the voice channels you want to use it in.

Starting captioning:
Join the voice channel you want to caption and type 
`#!caption start (or your prefix of choice instead of #!)`
captionbot will begin transcribing audio into the text channel you type the command into.

When done captioning:
Stay in your voice channel (or rejoin), and type
`#!caption stop`
this will disconnect the bot from your channel. Auto-disconnect is in progress.


