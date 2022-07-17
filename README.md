# twitch_translate_bot

Simple example of a translation bot for Twitch
Uses google translate througe googletrans npm package. It doesn't require a key, but it has some limitations. And you can easily adapt the script to use another API, eventually with your own API key.

# Requirements
In order to use this script you must
* Create a Twitch channel for your bot. The name of the bot will be the name of the channel and cannot be changed
* Generate a key for authenticating your bot, using the Twitch Chat OAuth Password Generator: https://twitchapps.com/tmi/

# Setup
You only need to install npm packages and run the script, by executing these commands in the folder where you have stored your copy of `bot.js` script. You'll need to set CHANNEL_NAME and CHANNEL_PASSWORD environment variables to node.

```
npm install
BOT_CHANNEL_NAME=yourBotName BOT_CHANNEL_PASSWORD=yourBotKey
POST_CHANNEL_NAME=yourChannelName
node ./bot.js
```

To stop the bot, you only need to press:

```
ctrl+C
```

# Updating Changes

After you have cloned this repository, you can pull updates to the code by going into the terminal (or git terminal), navigating to the location of this repository on your local machine (make sure your bot isn't currently running), and typing:

```
git pull origin master
```
This will pull updated code, and at that point.
