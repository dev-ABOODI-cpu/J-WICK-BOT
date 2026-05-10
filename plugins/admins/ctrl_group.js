/* ─── ❲ إدارة الـوصـول الذكية : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn, command }) => {
  // 1. تحديث بيانات المجموعة فوراً للتأكد من الرتب
  const groupMetadata = await conn.groupMetadata(m.chat).catch(e => null);
  const participants = groupMetadata ? groupMetadata.participants : [];
  const botNumber = conn.user.jid || conn.user.id.split(':')[0] + '@s.whatsapp.net';
  
  // 2. التحقق الفعلي: هل البوت أدمن الآن؟
  const isBotAdmin = participants.find(p => p.id === botNumber)?.admin !== null;

  if (!isBotAdmin) {
    return m.reply('*─── ❲ تـنـبـيـه الـنـظـام ❳ ───*\n\n⚠️ عـذراً يـا سـيـدي، لـقـد فـقـدت صـلاحـيـات الإدارة.\nيُـرجـى رفـعـي أدمـن لـتـفـعـيـل هـذا الأمـر.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
  }

  try {
    m.react("⏳"); // تفاعل الانتظار عشان تعرف إنه شغال

    if (command === "قفل") {
      await conn.groupSettingUpdate(m.chat, 'announcement');
      m.react("🔒");
      m.reply('*─── ❲ تـم الإغـلاق ❳ ───*\n\n🔒 تـم قـفـل الـدردشـة بـنـجـاح.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
    } 
    
    else if (command === "فتح") {
      await conn.groupSettingUpdate(m.chat, 'not_announcement');
      m.react("🔓");
      m.reply('*─── ❲ تـم الـفـتـح ❳ ───*\n\n🔓 الـدردشـة الـآن مـتـاحـة لـلـجـمـيـع.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
    }
  } catch (err) {
    console.error(err);
    m.reply('*─── ❲ خـطـأ تـقـنـي ❳ ───*\n\nحـدث تـأخـيـر فـي الاسـتـجـابـة مـن خـوادم واتـسـاب، حـاول مـرة أخـرى.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
  }
};

handler.usage = ["قفل", "فتح"];
handler.category = "admin";
handler.command = ["قفل", "فتح"];
handler.admin = true;    
// شيلنا handler.botAdmin القديمة عشان عملنا تحقق يدوي أسرع وأدق فوق

export default handler;
