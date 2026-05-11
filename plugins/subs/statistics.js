/* ─── ❲ إحـصـائـيـات الـبـوتـات : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const run = async (m, { conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("── ❲ خـطأ ❳ ──\n\n| نـظـام الـبـوتـات الـفـرعـيـة غـيـر مـتـاح");

  const stats = sub.stats();
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  const text = `─── ❲ إحـصـائـيـات الـبـوتـات الـفـرعـيـة ❳ ───\n\n` +
               `| الـمـجـمـوع الـكـلـي : [ ${stats.total} ]\n` +
               `| الـنـشـطـة الـآن : [ ${stats.connected} ]\n` +
               `| الـمـتـوقـفـة : [ ${stats.disconnected} ]\n` +
               `| إجـمـالـي الـرسـائـل : [ ${stats.totalMessages} ]\n\n` +
               `─── ❲ حـالـة الـنـظـام ❳ ───\n\n` +
               `| مـدة الـتـشـغـيـل : [ ${days} يـوم ، ${hours} سـاعـة ]\n` +
               `| الـمـعـالج الـرئـيـسـي : [ @${bot.sock.user.id.split('@')[0]} ]\n\n` +
               `─── 𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ───`;

  await m.reply(text);
};

run.command = ["احصائيات_البوتات"];
run.noSub = true;
run.usage = ["احصائيات_البوتات"];
run.category = "sub";

export default run;
