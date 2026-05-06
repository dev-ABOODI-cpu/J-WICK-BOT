const run = async (m, { conn, bot }) => {
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

  let nextPrayer = prayers[0];
  let foundNext = false;

  for (const p of prayers) {
    if (hours < p.h || (hours === p.h && minutes < p.m)) {
      nextPrayer = p;
      foundNext = true;
      break;
    }
  }

  if (!foundNext) {
    nextPrayer = prayers[0];
  }

  let diffHours = nextPrayer.h - hours;
  let diffMinutes = nextPrayer.m - minutes;

  if (diffMinutes < 0) {
    diffHours -= 1;
    diffMinutes += 60;
  }
  if (diffHours < 0) {
    diffHours += 24;
  }

  const timeStr = `${diffHours > 0 ? diffHours + ' ساعة و ' : ''}${diffMinutes} دقيقة`;

  const prayerMessage = `🕋 *الزمن المتبقي لصلاة ${nextPrayer.name}*

﴿ رِجَالٌ لَّا تُلْهِيهِمْ تِجَارَةٌ وَلَا بَيْعٌ عَن ذِكْرِ اللَّهِ وَإِقَامَةِ الصَّلَاةِ ﴾

✨ حان الوقت للصلاة: باقي على صلاة ${nextPrayer.name} حوالي ${timeStr}.

📖 *حديث شريف:*
"ما من مسلم يتطهر فيتم الطهور ثم يصلي الصلوات الخمس إلا كان كفارة لما بينهن." [رواه مسلم]

📲 @everyone`;

  await m.reply(prayerMessage);
};

run.command = ["prayer", "صلوات"];
run.usage = ["prayer"];
run.category = "الإسلاميات";
run.owner = false;

export default run;
