/* ─── ❲ نـظـام الـتـحـذيـر : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn, text }) => {
  let target = m.mentionedJid?.[0] || m.quoted?.sender;
  
  if (!target) return m.reply(`─── ❲ تـنـبـيـه ❳ ───\n\n| يُـرجـى مـنـشـن الـشـخـص أو الـرد عـلـى رسـالـتـه\n\n─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`);

  const groupMetadata = await conn.groupMetadata(m.chat);
  const user = groupMetadata.participants.find(p => p.id === target);

  if (!user) return m.reply(`─── ❲ خـطأ ❳ ───\n\n| الـمـسـتـخـدم غـيـر مـوجـود فـي هـذه الـمـجـموعـة\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ───`);

  global.db.groups[m.chat] ??= {};
  global.db.groups[m.chat].warnings ??= {};

  const warns = global.db.groups[m.chat].warnings;
  warns[target] = (warns[target] || 0) + 1;

  const warnCount = warns[target];
  const remaining = 3 - warnCount;

  let message = `─── ❲ سـجـل الـتـحـذيـر ❳ ───\n\n`;
  message += `| الـمـسـتـخـدم : @${target.split("@")[0]}\n`;
  message += `| إجـمـالـي الـإنـذارات : [ ${warnCount} / 3 ]\n`;
  message += `| الـمـتـبـقـي لـلـطـرد : [ ${remaining > 0 ? remaining : 0} ]\n\n`;
  message += `─── 𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ───`;

  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [target]
  }, { quoted: m });

  if (warnCount >= 3) {
    await conn.sendMessage(m.chat, { 
        text: `─── ❲ قـرار إداري ❳ ───\n\n| الـمـسـتـخـدم : @${target.split("@")[0]}\n| الـسـبـب : تـجـاوز حـد الـتـحـذيـرات\n| الـإجـراء : طـرد نـهـائـي\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚نـنـل ───`, 
        mentions: [target] 
    });
    await conn.groupParticipantsUpdate(m.chat, [target], "remove");
    delete warns[target];
  }
};

handler.command = ["انذار", "تحذير", "warn"];
handler.category = "admin";
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
