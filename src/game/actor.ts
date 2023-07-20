class Actor {
    name: string;
    hp: number;
    maxHp: number;
    attack: number;
    defence: number;
    xp: number;
    gold: number;

    constructor(name: string, hp: number, maxHp: number, attack: number, defence: number, xp: number, gold: number) {
        this.name = name;
        this.hp = hp;
        this.maxHp = maxHp;
        this.attack = attack;
        this.defence = defence;
        this.xp = xp;
        this.gold = gold;
    }

    fight(enemy: Actor) {
        this.defence = Math.min(enemy.defence, 19); // arbitrary cap to defence value, possibly temporary
        let chanceToHit = Math.floor(Math.random() * (20 - this.defence));
        let damage = 0;
        if (chanceToHit > 0) {
            damage = this.attack; // maybe have base attack and then multiply by weapon value?
        }

        enemy.hp -= damage;

        return enemy.hp <= 0; // return true if the enemy was defeated
    }
}

export {Actor};