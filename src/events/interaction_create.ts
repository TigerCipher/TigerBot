import {Events, Interaction} from "discord.js";
import {commands} from "../command_manager";

const name = Events.InteractionCreate;

async function execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const cmd = commands.get(interaction.commandName);

    if (!cmd) {
        console.error(
            `No such command ${interaction.commandName} found in the registry`
        );
        return;
    }

    try {
        await cmd.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
    }
}

export {name, execute};
