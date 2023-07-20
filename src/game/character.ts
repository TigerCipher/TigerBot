import {Actor} from "./actor";
import fs from "fs";

interface CharacterData {
    characters: Character[];
}

class Character extends Actor {

    LEVEL_CAP = 10;

    userId: string;
    level: number;
    mana: number;

    // TODO: Add inventory, battling state, mode, mana, level
    // TODO: Organize, maybe make a character builder for defaults
    constructor(name: string, hp: number, maxHp: number, attack: number, defence: number, xp: number, gold: number, userId: string, level: number = 1, mana: number = 15) {
        super(name, hp, maxHp, attack, defence, xp, gold);
        this.userId = userId;
        this.level = level;
        this.mana = mana;
    }

    save() {
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
    let data: CharacterData = {characters: []};
    try {
        const raw = fs.readFileSync("characters.json", "utf-8");
        data = JSON.parse(raw);
    } catch (error) {
        return null;
    }

    const existingCharIndex = data.characters.findIndex((char) => char.userId === userId);

    if (existingCharIndex !== -1) {
        const charData = data.characters[existingCharIndex];
        // TODO: Cleaner way of doing this
        return new Character(charData.name, charData.hp, charData.maxHp, charData.attack, charData.defence, charData.xp, charData.gold, charData.userId, charData.level, charData.mana);
    }
    return null;
}

export {Character, CharacterData, loadCharacter};