import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong! Prints bot ping status information");

async function execute(interaction: ChatInputCommandInteraction) {
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
}

export { data, execute };
