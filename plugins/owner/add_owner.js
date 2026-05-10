/* ─── ❲ تـفـويـض الـصـلاحـيـات : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn, bot }) => {
  // تحديد الهوية المستهدفة سواء بالمنشن أو الرد
  let targetLid = m.mentionedJid?.[0] || m.quoted?.sender;
  let targetJid = m.lid2jid(m.mentionedJid?.[0] || m.quoted?.sender);

  if (!targetJid || !targetLid) {
    return m.reply("*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى مـنـشـنـة الـمـرشـح أو الـرد عـلـى رسـالـتـه لـتـفـويـض الـصـلاحـيـات\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*");
  }

  try {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const user = groupMetadata.participants.find(
      p => p.id === targetLid || p.phoneNumber === targetJid
    );

    if (!user) {
      return m.reply("*─── ❲ خـطـأ فـي الـتـعـرف ❳ ───*\n\nتـعـذر الـعـثـور عـلـى بـيـانـات هـذا الـمـسـتـخـدم فـي قـاعـدة الـبـيـانـات الـحـالـيـة\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*");
    }

    // إضافة المطور الجديد لقائمة الملاك في الإعدادات المؤقتة (Config)
    bot.config.owners.push({
      name: "𝐑𝐔𝐒𝐓𝐀𝐌 𝐎𝐖𝐍𝐄𝐑",
      jid: user.phoneNumber || targetJid,
      lid: user.id || targetLid
    });

    m.reply(`*─── ❲ تـم الـتـفـويـض ❳ ───*\n\nتـم مـنـح الـعـضـو صـلاحـيـات الـمـطـور بـنـجـاح\n╰╼ الـمـطـور الـجـديـد : @${(user.phoneNumber || targetJid).split('@')[0]}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`, null, {
      mentions: [user.phoneNumber || targetJid]
    });

  } catch (e) {
    m.reply("*─── ❲ فـشـل فـي الـتـرقـيـة ❳ ───*\n\nحـدث خـطـأ أثـنـاء مـحـاولـة تـعـديـل مـلـف الإعـدادات\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*");
  }
};

handler.usage = ["اضافه-مطور"];
handler.category = "owner";
handler.command = ["ضيف_مطور", "اضافه_مطور", "addowner"];
handler.owner = true;

export default handler;
