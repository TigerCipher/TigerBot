import { Client, GatewayIntentBits } from "discord.js";

import { registerListeners } from "./event_manager";
import { deployCommands } from "./command_manager";
import { TOKEN } from "./globals";

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
  await deployCommands();

  client.login(TOKEN);
}

main();
