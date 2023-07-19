import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

import ready from "./listeners/ready.ts";

console.log("Bot is starting up...");

config();
const TOKEN = process.env.TIGER_BOT_TOKEN;
const CLIENT_ID = process.env.TIGER_CLIENT_ID;
const TEST_GUILD_ID = process.env.TEST_SERVER_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

ready(client);

client.login(TOKEN);

console.log(client);
