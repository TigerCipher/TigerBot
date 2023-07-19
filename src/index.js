import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
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

const commands = [
  {
    name: "ping",
    description: "Pong! Prints bot ping status information",
  },
  {
    name: "roll",
    description: "Roll a dice",
    options: [
      {
        name: "sides",
        description: "The type of dice to roll",
        type: 4,
        required: true,
        choices: [
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
          },
        ],
      },
    ],
  },
];

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
    let result = Math.floor(Math.random() * sides) + 1;
    await interaction.reply({
      content: `You rolled a d${sides} and got a ${result}\n*disclaimer: multiple dice not yet supported*`,
    });
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
