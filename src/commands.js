import { SlashCommandBuilder } from "@discordjs/builders";

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

const testEmoteCommand = new SlashCommandBuilder()
  .setName("test")
  .setDescription("Testing random stuff");

const commands = [
  pingCommand.toJSON(),
  rollCommand.toJSON(),
  testEmoteCommand.toJSON(),
];

export { commands };
