const run = async (m, { conn, bot }) => {

  const azkarList = [
    {
      title: "🌅 أذكار الصباح والمساء",
      content: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ...",
      virtue: "فضلها: حفظ وحماية للعبد طوال يومه."
    },
    {
      title: "✨ التسبيح والتحميد",
      content: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ...",
      virtue: "تقال ٣ مرات وهي من أعظم الأذكار."
    },
    {
      title: "🛡️ الحفظ والوقاية",
      content: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ...",
      virtue: "تحميك من كل أذى بإذن الله."
    },
    {
      title: "🤲 الاستغفار والتوبة",
      content: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ...",
      virtue: "يغفر الذنوب ولو كانت مثل زبد البحر."
    },
    {
      title: "🌟 دعاء الهم والغم",
      content: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ...",
      virtue: "يفرج الكرب ويزيل الهم."
    }
  ];

  const selected =
    azkarList[
      Math.floor(Math.random() * azkarList.length)
    ];

  await m.react("📿");

  const name =
    bot.config?.info?.nameBot ||
    "بوت إسلامي";

  const azkarMsg = `🌟 *${selected.title}*

${selected.content}

✨ *${selected.virtue}*

━━━━━━━━━━━━━━
*${name}*`;

  await m.reply(azkarMsg);
};

run.command = ["azkar", "اذكار"];
run.usage = ["azkar"];
run.category = "الإسلاميات";
run.owner = false;

export default run;
