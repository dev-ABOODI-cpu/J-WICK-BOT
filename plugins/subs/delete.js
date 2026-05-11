/* ─── ❲ حـذف الـبوت الـفرعـي : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const run = async (m, { args, conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("── ❲ خـطأ ❳ ──\n\n| نـظـام الـبـوتـات الـفـرعـيـة غـيـر مـتـاح");

  if (!args[0]) {
    return m.reply(`── ❲ تـنـبـيـه ❳ ──\n\n| يُـرجـى تـحـديـد الـبـوت لـحـذفـه\n\n| مـثـال (بـالـتـسـلـسـل) : ${bot.config.prefix[0]}حذف_بوت 1\n| مـثـال (بـالـرقـم) : ${bot.config.prefix[0]}حذف_بوت 249xxxxxxxxx`);
  }

  const input = args[0];
  let deleted = false;

  if (/^\d+$/.test(input) && input.length <= 2) {
    const idx = parseInt(input);
    try {
      await sub.removeByIndex(idx);
      deleted = true;
    } catch (e) {
      return m.reply(`── ❲ فـشـل ❳ ──\n\n| الـخـطأ : [ ${e.message} ]`);
    }
  } 
  else if (/^\d+$/.test(input)) {
    deleted = await sub.removeByPhone(input);
    if (!deleted) return m.reply(`── ❲ خـطأ ❳ ──\n\n| لـا يـوجـد بـوت مـسـجـل بـالـرقـم : [ ${input} ]`);
  }

  if (deleted) {
    await m.reply(`── ❲ نـجـاح ❳ ──\n\n| تـم حـذف الـبـوت وإلـغـاء نـظـام الـتـنـصـيـب لـه بـنـجـاح\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ───`);
  }
};

run.command = ["حذف_بوت"];
run.usage = ["حذف_بوت"];
run.category = "sub";
run.noSub = true;

export default run;
