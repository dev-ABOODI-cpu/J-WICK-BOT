const run = async (m, { conn, bot }) => {
  if (!m.isGroup) return m.reply("❌ *هذا الأمر يعمل في المجموعات فقط!*");

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // أوقات الصلاة التقريبية
  const prayers = [
    { name: 'الفجر', h: 4, m: 30 },
    { name: 'الظهر', h: 12, m: 0 },
    { name: 'العصر', h: 15, m: 30 },
    { name: 'المغرب', h: 18, m: 20 },
    { name: 'العشاء', h: 19, m: 45 }
  ];

  let currentPrayer = prayers[0];
  for (const p of prayers) {
    if (hours >= p.h || (hours === p.h && minutes >= p.m)) {
      currentPrayer = p;
    }
  }

  // جلب المشاركين في المجموعة لعمل المنشن الحقيقي
  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = groupMetadata.participants;
  const mentions = participants.map(u => u.id);

  const alertMsg = `╭───────────────✦
│ 🕋 *تذكير: حان الآن موعد صلاة ${currentPrayer.name}*
├───────────────
│ ﴿ حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ ﴾
│
│ ✨ تذكير للصلاة: حان الوقت لدخول وقت صلاة ${currentPrayer.name}. 
│ تقبل الله منا ومنكم صالح الأعمال.
╰───────────────✦

${mentions.map(v => '@' + v.split('@')[0]).join(' ')}`;

  await conn.sendMessage(m.chat, { text: alertMsg, mentions });
};

run.command = ["adthan", "تنبيه", "تنبيه-الصلاة"];
run.usage = ["adthan"];
run.category = "الإسلاميات";
run.owner = false;

export default run;
