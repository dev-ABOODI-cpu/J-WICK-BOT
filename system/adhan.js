import axios from "axios";

export function startAdhanSystem(client) {

  const sent = {};

  setInterval(async () => {

    try {

      const now = new Date();

      const time =
        now.toTimeString().slice(0, 5);

      const today =
        `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

      // إعداد المدينة والدولة
      const country = "Egypt";
      const city = "Cairo";

      // جلب مواقيت الصلاة
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

      if (!timings) return;

      const prayers = {
        Fajr: "الفجر",
        Dhuhr: "الظهر",
        Asr: "العصر",
        Maghrib: "المغرب",
        Isha: "العشاء"
      };

      const groups =
        await client.groupFetchAllParticipating();

      const list =
        Object.values(groups);

      for (const key in prayers) {

        const prayerTime =
          timings[key].slice(0, 5);

        const id =
          `${today}_${key}`;

        if (
          time >= prayerTime &&
          !sent[id]
        ) {

          sent[id] = true;

          console.log(
            `🕌 Adhan: ${prayers[key]}`
          );

          const message =
`╭───────────────✦
│ 🕋 حان الآن موعد صلاة ${prayers[key]}
├───────────────
│ 📍 ${city} - ${country}
│ 🕰️ ${prayerTime}
│
│ ﴿ وَأَقِيمُوا الصَّلَاةَ ﴾
│
│ ✨ تقبل الله منا ومنكم
╰───────────────✦`;

          for (const g of list) {

            try {

              await client.sendMessage(
                g.id,
                {
                  text: message
                }
              );

              await new Promise(
                r => setTimeout(r, 1200)
              );

            } catch (err) {
              console.log(
                "Group error:",
                g.id
              );
            }

          }

        }

      }

    } catch (e) {
      console.log(
        "Adhan error:",
        e.message
      );
    }

  }, 30000);

}
