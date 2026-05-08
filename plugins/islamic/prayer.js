import axios from "axios";

const run = async (m, { conn, bot }) => {

  try {

    const now = new Date();
    const currentMinutes =
      now.getHours() * 60 + now.getMinutes();

    const country = "Egypt";
    const city = "Cairo";

    // جلب مواقيت الصلاة من نفس API
    const res = await axios.get(
      "https://api.aladhan.com/v1/timingsByCity",
      {
        params: {
          city,
          country,
          method: 5
        }
      }
    );

    const timings =
      res.data?.data?.timings;

    if (!timings) {
      return m.reply("❌ لم يتم جلب مواقيت الصلاة");
    }

    const prayers = [
      { name: "الفجر", key: "Fajr" },
      { name: "الظهر", key: "Dhuhr" },
      { name: "العصر", key: "Asr" },
      { name: "المغرب", key: "Maghrib" },
      { name: "العشاء", key: "Isha" }
    ];

    const list = prayers.map(p => {

      const [h, mnt] =
        timings[p.key].split(":");

      return {
        name: p.name,
        total: parseInt(h) * 60 + parseInt(mnt)
      };

    });

    let next = null;

    for (const p of list) {
      if (p.total > currentMinutes) {
        next = p;
        break;
      }
    }

    // لو بعد العشاء → الفجر
    if (!next) {
      next = {
        ...list[0],
        total: list[0].total + 24 * 60
      };
    }

    const diff =
      next.total - currentMinutes;

    const h = Math.floor(diff / 60);
    const mnt = diff % 60;

    const timeStr =
      `${h > 0 ? h + " ساعة و " : ""}${mnt} دقيقة`;

    const msg = `🕋 *| الصلاة القادمة: ${next.name}*

📍 ${city} - ${country}

⏳ *الوقت المتبقي:* ${timeStr}

📖 ﴿ وَأَقِمِ الصَّلَاةَ لِذِكْرِي ﴾

✨ تقبل الله منا ومنكم`;

    await m.react("🕌");
    await m.reply(msg);

  } catch (e) {
    console.log(e);
    m.reply("❌ حدث خطأ في جلب مواقيت الصلاة");
  }

};

run.command = ["prayer", "صلوات"];
run.usage = ["prayer"];
run.category = "Islamic";
run.owner = false;

export default run;
