import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';
import axios from "axios";

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '249113388050',
  prefix: [".", "/", "!"],
  fromMe: false,
  owners: [
    { name: "DEV ABOODI", lid: "45033302565054@lid", jid: "249112727808@s.whatsapp.net" },
    { name: "DEV FABEE", lid: "180844597637238@lid", jid: "213553240538@s.whatsapp.net" },
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
  nameBot: "𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣〈",
  nameChannel: "𝐈𝐍 | 𝐃𝐀𝐒𝐇",
  idChannel: "120363407991526193@newsletter",
  urls: {
    repo: "https://github.com/dev-ABOODI-cpu/J-WICK-BOT.git",
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbD2uOa6rsQqt4yQQW0Y"
  },
  copyright: {
    pack: 'ـ 𝐈𝐍 | 𝐃𝐀𝐒𝐇 ـ ',
    author: 'IN'
  },
  images: [
    "https://i.postimg.cc/GmmN9MXn/346489b86106088cbef81de333f0fc8c.jpg", // الصورة الأساسية (الفارس)
    "https://i.postimg.cc/fLnB75jp/b29a1d059255ef3e1c179b5c6f82a0e3.jpg",
    "https://i.postimg.cc/rw7JcgbN/trashed-1780960534-823596d52cde35e0f2dc31a3b896d6c7.jpg",
    "https://i.postimg.cc/hjcVPY0m/4994268e94def6e6dcb2d19d60cacce7-(1).jpg",
    "https://i.postimg.cc/tRmnLJ8g/163851f759def2d8bf80494391a29d70.jpg",
    "https://i.postimg.cc/vZ51gzTt/785b9c77d049956fb867115a8684317c-(1).jpg",
    "https://i.postimg.cc/59GjsGFX/2713efe53a8f6460764d50e930d75ba4.jpg",
    "https://i.postimg.cc/K87zv8pW/c03a1d25b33422820213d54804f9395c.jpg", 
    "https://i.postimg.cc/QdD7qPRv/f732d69bde2635b8076c40da8537c12f.jpg", 
    "https://i.postimg.cc/RCnnx4mG/24368e09ba3db60ef4a923467c209dba.jpg"
   ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {

  if (client.commandSystem) {
    sub(client);
  }

  /* =========================
     🕌 ADHAN SYSTEM (FIXED)
     ========================= */
  const sent = {};

  setInterval(async () => {
    try {
      // جلب الوقت الحالي بتوقيت السودان لضمان الدقة
      const nowFormat = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Khartoum',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());

      const time = nowFormat; 
      const today = new Date().toLocaleDateString('en-GB', { timeZone: 'Africa/Khartoum' });

      const country = "Sudan"; 
      const city = "Khartoum";

      const res = await axios.get(
        "https://api.aladhan.com/v1/timingsByCity",
        { params: { city, country, method: 5 } }
      );

      const timings = res.data?.data?.timings;
      if (!timings) return;

      const prayers = {
        Fajr: "الفجر",
        Dhuhr: "الظهر",
        Asr: "العصر",
        Maghrib: "المغرب",
        Isha: "العشاء"
      };

      const groups = await client.groupFetchAllParticipating();
      const groupList = Object.values(groups);

      for (const key in prayers) {
        const prayerTime = timings[key].slice(0, 5); 
        const id = `${today}_${key}`;

        // إذا تطابق الوقت ولم تُرسل الرسالة اليوم
        if (time === prayerTime && !sent[id]) {
          sent[id] = true;

          const msg = `
╭── ❲ موعد الصلاة 🕋 ❳
│
│  ⏱️ حان الآن موعد أذان ${prayers[key]}
│  📍 الخرطوم - السودان
│  🕰️ التوقيت: ${prayerTime}
│
│  ﴿ وَأَقِيمُوا الصَّلَاةَ ﴾
│
╰── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎`.trim();

          for (const g of groupList) {
            try {
              await client.sendMessage(g.id, { text: msg });
              await new Promise(r => setTimeout(r, 2000)); 
            } catch (e) {
              console.log("Adhan Send Error:", g.id);
            }
          }
        }
      }
    } catch (e) {
      console.log("Adhan System Error:", e.message);
    }
  }, 60000); 

}, 2000);


/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
  if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});


/* =========== Memory Monitor ========== 

setInterval(() => {
  const used = process.memoryUsage().rss / 1024 / 1024;
  if (used > 800) {
    console.log(`🔄 Bot memory full (${used.toFixed(1)}MB), restarting...`);
    process.exit(1);
  }
}, 300000);

*/
