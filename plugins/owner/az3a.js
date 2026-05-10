/* ─── ❲ نـظـام الإذاعـة الـشـامـل : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const run = async (m, { conn, bot }) => {
  // منع البوتات الفرعية من استخدام الإذاعة العامة لضمان عدم الحظر
  if (bot.isSubBot) return;
  
  if (!m.quoted) return m.reply("*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى الـرد عـلـى الـرسـالـة الـمـراد تـعـمـيـمـهـا عـلـى الـنـظـام\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*");
  
  const groups = await conn.groupFetchAllParticipating();
  const groupList = Object.values(groups);
  
  if (groupList.length === 0) return m.reply("*─── ❲ خـطـأ فـنـي ❳ ───*\n\nلا تـوجـد مـجـمـوعـات مـسـجـلـة فـي قـاعـدة الـبـيـانـات حـالـيـاً\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*");
  
  m.reply(`*─── ❲ جـاري الـبـث الـعـام ❳ ───*\n\nيـتـم الآن إرسـال الـبـلاغ إلـى ( ${groupList.length} ) مـجـمـوعـة\nيُـرجـى عـدم إرسـال أوامـر أخـرى حـتـى انـتـهـاء الـعـمـلـيـة\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);

  let success = 0;
  
  for (const group of groupList) {
    try {
      const metadata = await conn.groupMetadata(group.id);
      const mentions = metadata.participants.map(p => p.id);
      
      // إرسال الرسالة مع المنشن الشامل لكل أعضاء الجروب
      await conn.sendMessage(group.id, {
        forward: m.quoted.fakeObj(),
        mentions: mentions
      });
      
      success++;
      // تأخير لمدة ثانيتين لتجنب حظر الرقم من شركة واتساب
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.error(`فشل الإرسال للمجموعة: ${group.id}`);
    }
  }
  
  await m.reply(`*─── ❲ تـم إنـهـاء الـبـث ❳ ───*\n\nتـم تـعـمـيـم الـرسـالـة بـنـجـاح\n╰╼ عـدد الـمـجـمـوعـات المـسـتـهـدفـة : [ ${success} ]\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
};

run.command = ["اذاعه", "broadcast"];
run.usage = ["اذاعه"];
run.category = "owner";
run.owner = true;

export default run;
