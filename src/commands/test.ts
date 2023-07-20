import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

import { emojis } from "../globals";

const data = new SlashCommandBuilder()
  .setName("test")
  .setDescription("Command used for random testing");

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({
    content: `Test: ${emojis["a"] + emojis[3] + emojis["!"]}`,
  });
}

export { data, execute };
