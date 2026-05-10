import axios from "axios";

export function startAdhanSystem(client) {
  const sent = {};

  setInterval(async () => {
    try {
      // 1. جلب الوقت الحالي بتوقيت السودان (أو غيره) لضمان الدقة
      const nowFormat = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Khartoum', // تقدر تغيرها لـ Egypt/Cairo لو حابب
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());

      const time = nowFormat; 
      const today = new Date().toLocaleDateString('en-GB', { timeZone: 'Africa/Khartoum' });

      // إعداد المدينة والدولة
      const country = "Sudan";
      const city = "Khartoum";

      // جلب مواقيت الصلاة من الـ API
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

      const timings = res.data?.data?.timings;
      if (!timings) return;

      const prayers = {
        Fajr: "الفجر",
        Dhuhr: "الظهر",
        Asr: "العصر",
        Maghrib: "المغرب",
        Isha: "العشاء"
      };

      const groups = await client.groupFetchAllParticipating();
      const list = Object.values(groups);

      for (const key in prayers) {
        const prayerTime = timings[key].slice(0, 5);
        const id = `${today}_${key}`;

        // الشرط المعدل: تطابق الوقت تماماً وعدم التكرار اليوم
        if (time === prayerTime && !sent[id]) {
          sent[id] = true;

          console.log(`🕌 Adhan: ${prayers[key]}`);

          const message = `
╭── ❲ موعد الصلاة 🕋 ❳
│
│  ⏱️ حان الآن موعد أذان ${prayers[key]}
│  📍 ${city} - ${country}
│  🕰️ التوقيت: ${prayerTime}
│
│  ﴿ وَأَقِيمُوا الصَّلَاةَ ﴾
│
╰── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎`.trim();

          for (const g of list) {
            try {
              await client.sendMessage(g.id, { text: message });
              // تأخير بسيط (ثانيتين) عشان واتساب ميزعلش (Anti-Ban)
              await new Promise(r => setTimeout(r, 2000));
            } catch (err) {
              console.log("Group error:", g.id);
            }
          }
        }
      }
    } catch (e) {
      console.log("Adhan error:", e.message);
    }
  }, 60000); // الفحص كل دقيقة كافي جداً وأخف على المعالج
}
