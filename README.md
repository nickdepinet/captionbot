# captionbot
Discord bot for captioning voice chats

# Setup

1) Register your bot with discord, obtain a bot API key, and invite the bot to your server.

2) Create your configuration file, src/.config.json - this contains your API key and command prefix

    ```
    {
        "discord-api-key": "discord-api-key",
        "prefix": "#!"
    }
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
Coming soon.


