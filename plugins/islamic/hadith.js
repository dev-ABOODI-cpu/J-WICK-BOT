import axios from "axios";

const run = async (m, { conn }) => {
  try {

    await m.react("📖");

    // مفتاح اليوم (حسب التاريخ)
    const now = new Date();
    const today =
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    // إنشاء تخزين مؤقت عام
    if (!global.hadithCache) {
      global.hadithCache = {};
    }

    // لو موجود حديث اليوم → أرسله نفس الحديث بدون API
    if (global.hadithCache[today]) {

      return m.reply(global.hadithCache[today]);

    }

    // جلب أحاديث من API
    const res = await axios.get(
      "https://api.hadith.gading.dev/books/bukhari?range=1-300"
    );

    const data = res.data?.data?.hadiths;

    if (!data || data.length === 0) {
      return m.reply("❌ لم يتم العثور على أحاديث");
    }

    // اختيار حديث عشوائي
    const random =
      data[Math.floor(Math.random() * data.length)];

    const hadithText = random.arab;

    const msg = `╭───────────────✦
📖 *حديث اليوم*
╰───────────────✦

${hadithText}

📚 صحيح البخاري

✨ تقبل الله منّا ومنكم`;

    // حفظ الحديث لليوم (منع التكرار)
    global.hadithCache[today] = msg;

    await m.reply(msg);

  } catch (e) {
    console.log(e);
    m.reply("❌ حدث خطأ أثناء جلب الحديث");
  }
};

run.command = ["hadith", "حديث"];
run.usage = ["hadith"];
run.category = "Islamic";
run.owner = false;

export default run;
