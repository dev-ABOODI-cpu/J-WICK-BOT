const handler = async (m, { conn }) => {
  const start = process.hrtime.bigint();
  await conn.sendMessage(m.chat, { text: "🏓 msg test" });
  const end = process.hrtime.bigint();
  const ping = Number(end - start) / 1e6;
  
  await conn.msgUrl(m.chat, `⚡ سرعة البوت: ${ping.toFixed(2)}ms`, {
    img: "https://i.postimg.cc/tRmnLJ8g/163851f759def2d8bf80494391a29d70.jpg",
    title: "𝐒𝐩𝐞𝐞𝐝 / 𝐓𝐞𝐬𝐭",
    body: "𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐛𝐨𝐭'𝐬 𝐬𝐩𝐞𝐞𝐝: 𝐈𝐬 𝐢𝐭 𝐟𝐚𝐬𝐭 𝐨𝐫 𝐧𝐨𝐭?",
    newsletter: {
      name: '𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥',
      jid: '120363425546384005@newsletter'
    },
    big: false
  }, global.reply_status);
};

handler.command = ["بنج", "ping"];
handler.category = "info";
handler.usage = ["بنج"];
export default handler;
