/* ─── ❲ مُـعـالـج الـطـلـبـات : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn, text }) => {
  try {
    const groupJid = m.chat;
    const req = await conn.groupRequestParticipantsList(groupJid);

    if (!req || req.length === 0) {
      return m.reply(`─── ❲ سـجـل الـطـلـبـات ❳ ───\n\n| الـحـالـة : لـا تـوجـد طـلـبـات مـعـلـقـة لـلـقـبـول\n\n─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`);
    }

    // تـحـديـد الـعـدد الـمـطـلـوب قـبـولـه
    const arg = parseInt(text);
    const limit = Number.isFinite(arg) && arg > 0 ? arg : req.length;
    const listToApprove = req.slice(0, limit);

    // تـجـهـيـز الـمـعـرفـات (JIDs) لـلـقـبـول
    const jids = listToApprove.map(r => r.jid || r.user || r.id);

    // تـنـفـيـذ أمـر الـقـبـول فـي Meowsab
    await conn.groupRequestParticipantsUpdate(
      groupJid,
      jids,
      "approve"
    );

    const message = `─── ❲ تـحـديـث الـحـالـة ❳ ───\n\n| الـإجـراء : قـبـول طـلـبـات الـانـضـمـام\n| الـعـدد الـمـنـفـذ : [ ${listToApprove.length} ]\n\n─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`;

    m.reply(message);

  } catch (error) {
    console.error("Meowsab Approve Error:", error);
    m.reply(`─── ❲ خـطـأ فـي الـنـظـام ❳ ───\n\n| الـسـبـب : تـعـذر تـنـفـيـذ أمـر الـقـبـول\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ───`);
  }
};

handler.help = ['اقبل_ريكوستات'];
handler.command = ["اقبل_ريكوستات", "اقبل_الطلبات", "approve"];
handler.category = "admin";
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
