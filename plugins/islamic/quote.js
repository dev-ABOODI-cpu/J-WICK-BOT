const run = async (m, { conn, bot }) => {
  const quoteMsg = `✨ *عبارة إسلامية جميلة:*

"إن لربك عليك حقاً، وإن لبدنك عليك حقاً، وإن لأهلك عليك حقاً، فأعطِ كل ذي حقٍ حقّه."

🌟 اجعل يومك مليئاً بالذكر والعمل الصالح.`;

  await m.reply(quoteMsg);
};

run.command = ["quote", "حكمة", "عبارة"];
run.usage = ["quote"];
run.category = "الإسلاميات";
run.owner = false;

export default run;
