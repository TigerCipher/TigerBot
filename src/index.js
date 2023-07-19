import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from "@discordjs/builders";
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

const rest = new REST({ version: "10" }).setToken(TOKEN);

const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong! Prints bot ping status information");

const rollCommand = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("Roll a dice")
  .addIntegerOption((option) =>
    option
      .setName("sides")
      .setDescription("The type of dice to roll")
      .setRequired(true)
      .addChoices(
        {
          name: "d4",
          value: 4,
        },
        {
          name: "d6",
          value: 6,
        },
        {
          name: "d8",
          value: 8,
        },
        {
          name: "d12",
          value: 12,
        },
        {
          name: "d20",
          value: 20,
        },
        {
          name: "percentile (d100)",
          value: 100,
        }
      )
  )
  .addIntegerOption((option) =>
    option
      .setName("number")
      .setDescription("The number of dice to roll")
      .setRequired(false)
  );

const commands = [pingCommand.toJSON(), rollCommand.toJSON()];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
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
