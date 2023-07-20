import {Character, loadCharacter} from "./character";

function testInitGame() {
    console.log("Starting up test initialization for the game");

    // let char = new Character("Ryker the Elf", 5, 6, 3, 15, 10, 10, "example discord id");
    let char1 = loadCharacter("example discord id");
    // let char = loadCharacter("non existing id");
    console.log(`Loaded character: ${char1?.name}`);
    let char2 = new Character("Monaj the Warlock", 5, 6, 3, 15, 0, 10, "another id", 2);

    if (char1 !== null) {
        console.log(`Char1 is: ${char1.constructor.name}`);
        char1.save();
    }
    char2.save();
    console.log("In theory, character should have been saved");
}

export {testInitGame};