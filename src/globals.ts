import { config } from "dotenv";

const emojis = {
  a: "🇦",
  b: "🇧",
  c: "🇨",
  d: "🇩",
  e: "🇪",
  f: "🇫",
  g: "🇬",
  h: "🇭",
  i: "🇮",
  j: "🇯",
  k: "🇰",
  l: "🇱",
  m: "🇲",
  n: "🇳",
  o: "🇴",
  p: "🇵",
  q: "🇶",
  r: "🇷",
  s: "🇸",
  t: "🇹",
  u: "🇺",
  v: "🇻",
  w: "🇼",
  x: "🇽",
  y: "🇾",
  z: "🇿",
  0: "0️⃣",
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
  10: "🔟",
  "#": "#️⃣",
  "*": "*️⃣",
  "!": "❗",
  "?": "❓",
};

class Globals {
  private static instance: Globals;

  private constructor() {
    console.log("Configuring environment...");
    config();

    this.TOKEN = process.env.TIGER_BOT_TOKEN!;
    this.CLIENT_ID = process.env.TIGER_CLIENT_ID!;
    this.TEST_GUILD_ID = process.env.TEST_SERVER_ID!;
  }

  public static getInstance(): Globals {
    if (!Globals.instance) {
      Globals.instance = new Globals();
    }
    return Globals.instance;
  }

  public TOKEN: string;
  public CLIENT_ID: string;
  public TEST_GUILD_ID: string;
}

export { emojis };
export default Globals.getInstance();
