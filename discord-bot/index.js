require('dotenv').config()
const {Client, GatewayIntentBits} = require('discord.js')
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});


client.on("messageCreate", (message) => {
    if (message.author.bot) return; // Ignore messages from bots
    message.reply({
        content: "Hello! This is a response from the bot."});
    console.log(`Message received: ${message}`);
});

client.login(process.env.token);