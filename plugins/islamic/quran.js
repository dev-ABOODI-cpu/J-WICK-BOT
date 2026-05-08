import axios from "axios";

const run = async (m, { conn, bot }) => {

  try {

    await m.react("📖");

    // جلب قائمة السور
    const surahRes =
      await axios.get(
        "https://api.alquran.cloud/v1/surah"
      );

    const surahs =
      surahRes.data?.data;

    if (!surahs || surahs.length === 0) {
      return m.reply("❌ فشل جلب السور");
    }

    // اختيار سورة عشوائية
    const randomSurah =
      surahs[Math.floor(Math.random() * surahs.length)];

    // جلب آيات السورة المختارة
    const ayahRes =
      await axios.get(
        `https://api.alquran.cloud/v1/surah/${randomSurah.number}`
      );

    const ayahs =
      ayahRes.data?.data?.ayahs;

    if (!ayahs || ayahs.length === 0) {
      return m.reply("❌ فشل جلب الآيات");
    }

    // اختيار آية عشوائية
    const randomAyah =
      ayahs[Math.floor(Math.random() * ayahs.length)];

    const text = randomAyah.text;
    const number = randomAyah.numberInSurah;

    const msg = `╭───────────────✦
📖 *آية قرآنية*
╰───────────────✦

${text}

📚 ${randomSurah.name} - آية ${number}

✨ *تأمل:* كلام الله عز وجل هداية ورحمة للمؤمنين

━━━━━━━━━━━━━━`;

    await m.reply(msg);

  } catch (e) {
    console.log(e);
    m.reply("❌ حدث خطأ أثناء جلب الآية");
  }

};

run.command = ["quran", "قران"];
run.usage = ["quran"];
run.category = "Islamic";
run.owner = false;

export default run;
