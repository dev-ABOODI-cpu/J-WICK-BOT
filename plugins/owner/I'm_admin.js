/* ─── ❲ إنـفـاذ الـسـيـادة : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn }) => {
  // تفاعل القوة والاحترام للمطور
  m.react("🫡");

  try {
    // تنفيذ أمر الترقية للمطور داخل المجموعة
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');

    // رد رسمي يليق بمكانة المطور عبودي
    m.reply(`*─── ❲ تـم إنـفـاذ الأمـر ❳ ───*\n\nأهـلاً بـك فـي سـدة الـقـيادة يـا مـطـوري **𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈**\nتـم تـفـعـيـل صـلاحـيـات الإدارة الـكـامـلـة لـحـسـابـك الآن\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
    
  } catch (error) {
    m.reply(`*─── ❲ فـشـل الـتـرقـيـة ❳ ───*\n\nتـأكـد مـن مـنـح الـبـوت صـلاحـيـات الأدمن أولاً لـتـنـفـيذ هـذا الإجـراء\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
  }
};

handler.usage = ["ارفعني"];
handler.category = "owner";
handler.command = ["ارفعني", "promote_me"];
handler.owner = true;
handler.botAdmin = true; // شرط أساسي لكي يتمكن البوت من رفعك

export default handler;
