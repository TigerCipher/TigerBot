import {Client, Events} from "discord.js";

const name = Events.ClientReady;

function execute(client: Client) {
    console.log(`Bot logged in as ${client.user!.tag}`);
}

export {name, execute};
