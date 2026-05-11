/* ─── ❲ إذاعـة الـبـوتـات الـفـرعـيـة : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const run = async (m, { conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("── ❲ خـطأ ❳ ──\n\n| نـظـام الـبـوتـات الـفـرعـيـة غـيـر مـتـاح");
  
  if (!m.quoted) return m.reply("── ❲ تـنـبـيـه ❳ ──\n\n| قـم بـالـرد عـلـى الـرسـالـة الـتـي تـريـد إذاعـتـهـا");
  
  const bots = sub.list();
  const activeBots = bots.filter(b => b.connected && b.phone && b.id !== bot.id);
  
  if (activeBots.length === 0) return m.reply("── ❲ تـنـبـيـه ❳ ──\n\n| لـا يـوجـد بـوتـات فـرعـيـة مـتـصـلـة لـلـإذعـة حـالـيـاً");
  
  const waitMsg = await m.reply(`── ❲ جـاري الـإذاعـة ❳ ──\n\n| يـتـم الـآن بـث الـرسـالـة عـبـر [ ${activeBots.length} ] بـوتـات...\n| يُـرجـى الـإنـتـظـار`);

  let success = 0;
  let fail = 0;
  let groupCount = 0;
  
  for (const b of activeBots) {
    try {
      const botConn = sub.get(b.id);
      const sock = botConn?.sock;
      if (!sock) continue;
      
      const groups = await sock.groupFetchAllParticipating();
      const groupList = Object.values(groups);
      groupCount += groupList.length;
      
      for (const group of groupList) {
        try {
          const groupMetadata = await sock.groupMetadata(group.id);
          const participants = groupMetadata.participants.map(p => p.id);
          
          await sock.sendMessage(group.id, {
            forward: m.quoted.fakeObj(),
            mentions: participants
          }, { quoted: global.reply_status });
          
          success++;
          await new Promise(r => setTimeout(r, 2000)); // تأخير لتجنب الحظر
        } catch (e) {
          fail++;
        }
      }
    } catch (e) {
      fail++;
    }
  }
  
  const report = `─── ❲ تـقـريـر الـإذاعـة الـشـامـل ❳ ───\n\n` +
                 `| الـنـجـاح : [ ${success} ]\n` +
                 `| الـفـشـل : [ ${fail} ]\n` +
                 `| عـدد الـبـوتـات : [ ${activeBots.length} ]\n` +
                 `| إجـمـالـي الـمـجـموعـات : [ ${groupCount} ]\n\n` +
                 `─── 𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ───`;

  await m.reply(report);
};

run.command = ["اذاعة_فرعي", "اذاعه_فرعي"];
run.category = "sub";
run.noSub = true;
run.owner = true;

export default run;
