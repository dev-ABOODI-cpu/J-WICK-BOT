const run = async (m, { conn, bot }) => {
  // قائمة تحتوي على مجموعة من الحكم والعبارات الإسلامية للاختيار منها عشوائياً
  const quotesList = [
    {
      text: "إن لربك عليك حقاً، وإن لبدنك عليك حقاً، وإن لأهلك عليك حقاً، فأعطِ كل ذي حقٍ حقّه.",
      reference: "رواه البخاري"
    },
    {
      text: "من لزم الاستغفار، جعل الله له من كل همٍ فرجاً، ومن كل ضيقٍ مخرجاً، ورزقه من حيث لا يحتسب.",
      reference: "حديث شريف"
    },
    {
      text: "لا تحزن إن الله معنا.",
      reference: "القرآن الكريم - التوبة: 40"
    },
    {
      text: "استعن بالله ولا تعجز.",
      reference: "حديث شريف"
    },
    {
      text: "الكلمة الطيبة صدقة.",
      reference: "حديث شريف"
    },
    {
      text: "اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن.",
      reference: "حديث شريف"
    },
    {
      text: "الدنيا ممر وليست مستقر، فاعمل لدار البقاء.",
      reference: "حكمة إسلامية"
    },
    {
      text: "من توكل على الله كفاه، ومن استعان به أعانه.",
      reference: "حكمة إسلامية"
    },
    {
      text: "إن مع العسر يسراً، إن مع العسر يسراً.",
      reference: "القرآن الكريم - الشرح: 5-6"
    },
    {
      text: "طوبى لمن وجد في صحيفته استغفاراً كثيراً.",
      reference: "أثر إسلامي"
    }
  ];

  // اختيار عبارة عشوائية من القائمة
  const randomIndex = Math.floor(Math.random() * quotesList.length);
  const selected = quotesList[randomIndex];

  const quoteMsg = `✨ *عبارة إسلامية جميلة:*

"${selected.text}"

📖 _${selected.reference}_

🌟 اجعل يومك مليئاً بالذكر والعمل الصالح.

---
*♡ 𝗜𝗡 - 𝗝 𝗪𝗶𝗰𝗸 🏮〈*`;

  await m.reply(quoteMsg);
};

run.command = ["quote", "حكمة", "عبارة"];
run.usage = ["quote"];
run.category = "الإسلاميات";
run.owner = false;

export default run;
