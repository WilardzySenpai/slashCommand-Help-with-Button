const { Client, Collection } = require("discord.js");
const { readdirSync } = require('fs');
require("./keep_alive");

const client = new Client({
    intents: 32767,
     ws: { properties: { $browser: "discord.js" } }
   //ws: { properties: { $browser: "Discord iOS" } } to make your discord bot status on phone
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

//anticrash
process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p)
})
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin)
})

client.login(client.config.token);
