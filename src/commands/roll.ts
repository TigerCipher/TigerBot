import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const data = new SlashCommandBuilder()
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

async function execute(interaction: ChatInputCommandInteraction) {
  let sides = interaction.options.getInteger("sides");
  let results = new Array();
  let num = interaction.options.getInteger("number");
  if (num != null) {
    let resultString = "";
    for (let i = 0; i < num; i++) {
      results.push(Math.floor(Math.random() * sides!) + 1);
    }

    for (let i = 0; i < num - 1; i++) {
      resultString += results[i] + ", ";
    }
    resultString += results[num - 1];

    await interaction.reply({
      content: `You rolled ${num} d${sides} and got ${resultString}`,
    });
  } else {
    results.push(Math.floor(Math.random() * sides!) + 1);
    await interaction.reply({
      content: `You rolled a d${sides} and got a ${results}`,
    });
  }
}

export { data, execute };
