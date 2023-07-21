import {Actor} from "./actor";

// TODO
class Enemy extends Actor {
    // constructor(name: string, maxHp: number, attack: number, defence: number, xp: number, gold: number){
    //     super(name, maxHp, maxHp, attack, defence, xp, gold);
    // }
}

class GiantRat extends Enemy {
    minLevel = 1;
    // constructor(){
    //     super("Giant Rat", 2, 1, 1, 1, 1);
    // }
}

export { Enemy, GiantRat };