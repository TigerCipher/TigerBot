import {Routes, Collection, ChatInputCommandInteraction} from "discord.js";
import {REST} from "@discordjs/rest";
import {SlashCommandBuilder} from "@discordjs/builders";
import fs from "fs";
import path from "path";
import globals from "./globals";

interface BaseCommand {
    data: SlashCommandBuilder;

    execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

const commands = new Collection<String, BaseCommand>();
const commandsArray: Array<any> = [];

function registerCommands() {
    const commandsPath = path.join(__dirname, "commands");

    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const cmd: BaseCommand = require(filePath);
        console.log(`Registering ${cmd.data.name} command from ${filePath}`);

        if ("data" in cmd && "execute" in cmd) {
            commands.set(cmd.data.name, cmd);
            commandsArray.push(cmd.data.toJSON());
        } else {
            console.log(
                `WARNING: Command at ${filePath} missing either 'data' or 'execute' property`
            );
        }
    }
}

async function deployCommands() {
    try {
        const rest = new REST({version: "10"}).setToken(globals.TOKEN);
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(globals.CLIENT_ID, globals.TEST_GUILD_ID),
            {
                body: commandsArray,
            }
        );

        // TEMP (removes global commands)
        // await rest.put(Routes.applicationCommands(globals.CLIENT_ID), { body: [] });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error("Error occurred while reloading appplication (/) commands");
        console.error(error);
    }
}

export {deployCommands, commands, registerCommands};
