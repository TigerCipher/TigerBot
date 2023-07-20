import {Client, GatewayIntentBits} from "discord.js";

import {registerListeners} from "./event_manager";
import globals from "./globals";
import {deployCommands, registerCommands} from "./command_manager";

console.log("Bot is starting up...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

async function main() {
    registerListeners(client);
    registerCommands();
    await deployCommands();

    await client.login(globals.TOKEN);
}

main().then(r => console.log("Initialization complete"));
