import { Routes, Collection, ChatInputCommandInteraction } from "discord.js";
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from "@discordjs/builders";
import fs from "fs";
import path from "path";
import { CLIENT_ID, TEST_GUILD_ID, TOKEN } from "./globals";

interface BaseCommand {
  data: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

const commandsSet = new Collection<String, BaseCommand>();

const commandsPath = path.join(__dirname, "commands");
const commands = new Array();
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const cmd: BaseCommand = require(filePath);
  console.log(`Registering ${cmd.data.name} command from ${filePath}`);

  if ("data" in cmd && "execute" in cmd) {
    commandsSet.set(cmd.data.name, cmd);
    commands.push(cmd.data.toJSON());
  } else {
    console.log(
      `WARNING: Command at ${filePath} missing either 'data' or 'execute' property`
    );
  }
}

const rest = new REST({ version: "10" }).setToken(TOKEN!);

async function deployCommands() {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID!, TEST_GUILD_ID!),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error occurred while reloading appplication (/) commands");
    console.error(error);
  }
}

export { deployCommands, commandsSet, BaseCommand };
