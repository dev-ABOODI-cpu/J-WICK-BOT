import axios from "axios";

const run = async (m, { conn, bot }) => {

  try {

    await m.react("📖");

    // اختيار سورة وآية عشوائية (تقريب بسيط)
    const surahNumber =
      Math.floor(Math.random() * 114) + 1;

    // جلب بيانات السورة
    const surahRes =
      await axios.get(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );

    const surah =
      surahRes.data?.data;

    if (!surah) {
      return m.reply("❌ فشل جلب السورة");
    }

    // اختيار آية عشوائية
    const ayahs = surah.ayahs;

    const randomAyah =
      ayahs[Math.floor(Math.random() * ayahs.length)];

    const ayahKey =
      `${surahNumber}:${randomAyah.numberInSurah}`;

    // جلب التفسير
    const tafsirRes =
      await axios.get(
        `https://api.alquran.cloud/v1/ayah/${ayahKey}/ar.altafsir`
      );

    const tafsir =
      tafsirRes.data?.data?.text || "لا يوجد تفسير متاح";

    const msg = `╭───────────────✦
📖 *تفسير آية*
╰───────────────✦

${randomAyah.text}

📚 ${surah.name} - آية ${randomAyah.numberInSurah}

✨ *التفسير:*
${tafsir}

━━━━━━━━━━━━━━`;

    await m.reply(msg);

  } catch (e) {
    console.log(e);
    m.reply("❌ حدث خطأ أثناء جلب التفسير");
  }

};

run.command = ["tafsir", "تفسير"];
run.usage = ["tafsir"];
run.category = "Islamic";
run.owner = false;

export default run;
