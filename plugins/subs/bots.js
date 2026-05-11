/* ─── ❲ قـائـمـة الـبـوتـات الـفـرعـيـة : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const run = async (m, { conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("── ❲ خـطأ ❳ ──\n\n| نـظـام الـبـوتـات الـفـرعـيـة غـيـر مـتـاح");

  const bots = sub.list();
  if (bots.length === 0) return m.reply("── ❲ تـنـبـيـه ❳ ──\n\n| لـا يـوجـد بـوتـات فـرعـيـة مـثـبـتـة حـالـيـاً");

  let text = `─── ❲ نـظـام الـبـوتـات الـفـرعـيـة ❳ ───\n\n`;
  
  const mentions = [];
  
  bots.forEach((b, i) => {
    const jid = b.phone ? `${b.phone}@s.whatsapp.net` : null;
    if (jid) mentions.push(jid);
    
    const status = b.connected ? 'مـتـصـل' : 'غـيـر مـتـصـل';
    
    text += `| الـرقم : [ ${jid ? `@${b.phone}` : b.phone || 'غير معروف'} ]\n`;
    text += `| الـحـالـة : [ ${status} ]\n`;
    text += `| الـرسـائـل : [ ${b.messages || 0} ]\n`;
    text += `| الـتـسـلـسـل : [ #${i+1} ]\n`;
    text += `── ── ── ── ── ── ── ──\n`;
  });
  
  text += `\n| إجـمـالـي الـعـدد : [ ${bots.length} ]\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚نـنـل ───`;

  const { images } = bot.config.info;
  const img = images?.[Math.floor(Math.random() * images.length)] || "https://i.postimg.cc/vZ51gzTt/785b9c77d049956fb867115a8684317c-(1).jpg";

  await conn.sendMessage(m.chat, {
    text: text,
    mentions: mentions,
    contextInfo: {
      externalAdReply: {
        title: "𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥",
        body: "نـظـام إدارة الـبـوتـات الـفـرعـيـة الـمـتـطـور",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: global.reply_status });
};

run.command = ["البوتات", "bots"];
run.noSub = true;
run.category = "sub";

export default run;
