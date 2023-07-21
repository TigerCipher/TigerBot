import {Actor} from "./actor";
import fs from "fs";
import {hydrate} from "../util"

interface CharacterData {
    characters: Character[];
}

class Character extends Actor {

    LEVEL_CAP = 10;

    userId: string = "user_id";
    level: number = 1;
    mana: number = 20;

    // TODO: Add inventory, battling state, mode, mana, level


    save() {
        console.log(`Saving character "${this.name}`);
        let data: CharacterData = {characters: []};
        try {
            const raw = fs.readFileSync("characters.json", "utf-8");
            data = JSON.parse(raw);
        } catch (error) {
        }

        const existingCharIndex = data.characters.findIndex((char) => char.userId === this.userId);

        if (existingCharIndex !== -1) {
            data.characters[existingCharIndex] = this;
        } else {
            data.characters.push(this);
        }

        fs.writeFileSync("characters.json", JSON.stringify(data, null, 2), "utf-8");
    }
}

function loadCharacter(userId: string) {
    let raw = "";
    try {
        raw = fs.readFileSync("characters.json", "utf-8");
    } catch (error) {
        return null;
    }
    const data: Character[] = JSON.parse(raw).characters;
    const charItem = data.find((c) => c.userId === userId); // finds the character as Object
    const charStr = charItem ? JSON.stringify(charItem) : null; // turn it back into a json strong to use my hydrate function
    if(charStr != null){
        console.log(`CharItem is: ${charItem?.constructor.name}`);
        console.log(`Found character: ${charStr}`);
        return hydrate(Character, charStr); // rehydrate the character json data into an actual Character object with behavior
    }

    return null;
}

export {Character, loadCharacter};