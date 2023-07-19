import { Client } from "discord.js";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }
    console.log(`Bot logged in as ${client.user.tag}`);
  });
};
