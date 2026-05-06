const run = async (m, { conn, bot }) => {
  const tafsirMsg = `📖 *تفسير الآية:*

﴿ إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ ﴾ [النحل: 128]

✨ *التفسير الميسر:*
إن الله بعونه وتوفيقه مع الذين يتقونه باجتناب نواهيه، ومع الذين يحسنون في عبادة ربهم ومعاملة خلقه.`;

  await m.reply(tafsirMsg);
};

run.command = ["tafsir", "تفسير"];
run.usage = ["tafsir"];
run.category = "الإسلاميات";
run.owner = false;

export default run;
