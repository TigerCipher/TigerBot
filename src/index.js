import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { config } from "dotenv";

import { commands } from "./commands.js";
import { emojis } from "./globals.js";

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

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "test") {
    await interaction.reply({
      content: `Test: ${emojis["a"] + emojis[3] + emojis["!"]}`,
    });
  } else if (interaction.commandName === "ping") {
    // await interaction.reply("Pong!");
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    interaction.editReply(
      `Pong!\nUptime: ${Math.round(
        interaction.client.uptime / 60000
      )} minutes\nWebsocket heartbeat: ${
        interaction.client.ws.ping
      } ms\nRoundtrip latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      } ms`
    );
  } else if (interaction.commandName === "roll") {
    let sides = interaction.options.getInteger("sides");
    let results = new Array();
    let num = interaction.options.getInteger("number");
    if (num != null) {
      let resultString = "";
      for (let i = 0; i < num; i++) {
        results.push(Math.floor(Math.random() * sides) + 1);
      }

      for (let i = 0; i < num - 1; i++) {
        resultString += results[i] + ", ";
      }
      resultString += results[num - 1];

      await interaction.reply({
        content: `You rolled ${num} d${sides} and got ${resultString}`,
      });
    } else {
      results.push(Math.floor(Math.random() * sides) + 1);
      await interaction.reply({
        content: `You rolled a d${sides} and got a ${results}`,
      });
    }
  }
});

async function main() {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");

    client.login(TOKEN);
  } catch (error) {
    console.error(error);
  }
}

main();
