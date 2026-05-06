const run = async (m, { conn, bot }) => {
  const quranMsg = `📖 *آية قرآنية:*

﴿ وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ ﴾ [التوبة: 105]

✨ *تأمل قرآني:* هذه الآية تحث على الإتقان والعمل الصالح، فاجعل عملك خالصاً لوجه الله، متقناً في أدائه.`;

  await m.reply(quranMsg);
};

run.command = ["quran", "قران"];
run.usage = ["quran"];
run.category = "الإسلاميات";
run.owner = false;

export default run;
