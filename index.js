import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '249113388050', // Bot number
  prefix: [".", "/", "!"],
  fromMe: false, 
  owners: [
  // Owner 1
    { name: "DEV ABOODI", lid: "45033302565054@lid", jid: "249112727808@s.whatsapp.net" },
  // Owner 2
    { name: "DEV FABEE", lid: "180844597637238@lid", jid: "213553240538@s.whatsapp.net" },
  // Owner 3
    { name: "DEV QUSAY", jid: "249906024672@s.whatsapp.net", lid: "140974315548752@lid" },
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "♡ 𝗜𝗡 - 𝗝 𝗪𝗶𝗰𝗸 🏮〈", 
  nameChannel: "𝐈𝐍 | 𝐃𝐀𝐒𝐇", 
  idChannel: "120363407991526193@newsletter",
  urls: {
    repo: "https://github.com/deveni0/Pomni-AI",
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VaQim2bAu3aPsRVaDq3v"
  },
  copyright: { 
    pack: 'ـ 𝐈𝐍 | 𝐃𝐀𝐒𝐇 ـ ', 
    author: 'IN'
  },
  images: [
    "https://i.postimg.cc/hPgCbTrQ/78177908917fcd7be836153ed85f1073-webp.webp",
    "https://i.postimg.cc/sfPmX1Rq/a0a32b4f7bc7668c79fce97fbbc54e58.jpg",
    "https://i.postimg.cc/TPmm4Hdz/d22470094b1aadeab02fe93ba2c41d19.jpg", 
    "https://i.postimg.cc/D0fXmvrb/IMG-20260503-122845.jpg",
    "https://i.postimg.cc/pr1pTDV7/IMG-20260503-122826.jpg",
    "https://i.postimg.cc/zBxftngM/d9158ee04c04f6da70170584493042c2.jpg", 
    "https://i.postimg.cc/dtk06ZtN/60e7d686ff75a3fa9e1a0a64d29135d7.jpg"
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) { 
sub(client)
  }
}, 2000);


/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});


/* 
=========== Memory Monitor ========== 

setInterval(() => {
    const used = process.memoryUsage().rss / 1024 / 1024
    if (used > 800) {
        console.log(`🔄 Bot memory full (${used.toFixed(1)}MB), restarting...`)
        process.exit(1) 
    }
}, 300_000) 

*/