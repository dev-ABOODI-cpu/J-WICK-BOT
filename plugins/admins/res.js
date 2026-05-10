/* ─── ❲ سـجـل الـطـلـبـات : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn }) => {
  try {
    // في Meowsab، جلب الطلبات يعتمد على ميثود المجموعة المباشر
    const groupJid = m.chat;
    const req = await conn.groupRequestParticipantsList(groupJid);
    
    if (!req || req.length === 0) {
      return m.reply(`─── ❲ سـجـل الـطـلـبـات ❳ ───\n\n| الـحـالـة : لـا تـوجـد طـلـبـات انـضـمـام مـعـلـقـة\n\n─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`);
    }

    let list = "";
    let mentions = [];

    req.forEach((participant, i) => {
      // Meowsab غالباً ما تعيد المعرف في حقل jid أو user
      const userJid = participant.jid || participant.user;
      const num = userJid.split('@')[0];
      list += `| ${i + 1}. @${num}\n`;
      mentions.push(userJid);
    });

    const message = `─── ❲ طـلـبـات الـانـضـمـام ❳ ───\n\n| عـدد الـطـلـبـات : [ ${req.length} ]\n\n${list}\n─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`;

    // إرسال الرسالة مع المنشن المخصص للمكتبة
    await conn.sendMessage(groupJid, {
      text: message,
      contextInfo: { mentionedJid: mentions }
    }, { quoted: m });

  } catch (error) {
    console.error("Meowsab Error:", error);
    m.reply(`─── ❲ خـطـأ فـي الـنـظـام ❳ ───\n\n| الـسبب : تـعـذر جـلـب الـقـائـمـة حـالـيـاً\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ───`);
  }
};

handler.help = ['الريكوستات'];
handler.command = ["الريكوستات", "الطلبات", "requests"];
handler.category = "admin";
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
