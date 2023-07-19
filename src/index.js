import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

console.log("Starting up bot...");

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

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

async function main() {
  try {
    client.login(TOKEN);
  } catch (error) {
    console.error(error);
  }
}

main();
