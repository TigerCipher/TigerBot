import {Client} from "discord.js";
import fs from "fs";
import path from "path";

function registerListeners(client: Client) {
    const listenersPath = path.join(__dirname, "events");
    const files = fs
        .readdirSync(listenersPath)
        .filter((file) => file.endsWith(".ts"));

    for (const file of files) {
        const filePath = path.join(listenersPath, file);
        const listener = require(filePath);
        console.log(`Registering ${listener.name} listener from ${filePath}`);

        client.on(listener.name, (...args) => listener.execute(...args));
    }
}

export {registerListeners};
