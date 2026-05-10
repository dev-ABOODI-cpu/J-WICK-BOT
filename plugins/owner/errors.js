/* ─── ❲ سـجـل تـقـارير الـخـلل : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const run = async (m, { bot, conn }) => {
  // جلب قائمة الأخطاء من محرك البوت
  const errors = await bot.errors();
  
  if (errors.length === 0) {
    return m.reply("*─── ❲ فـحـص الـنـظـام ❳ ───*\n\nتـم اكـتـمـال الـفـحـص: الـنـظـام يـعـمـل بـكـفـاءة 100% ولا تـوجـد أي أعـطـال مـسـجـلـة\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*");
  }

  const res = errors.map((x, i) => `
╭─╼ ❲ الـتـقـريـر رقـم : ${i + 1} ❳
│
│ 📂 الـمـلـف ⊸ [ ${x.file} ]
│ 🌱 الأمـر ⊸ [ ${x.command} ]
│ ❌ الـخـلل ⊸ [ ${x.error} ]
│
╰───────────────────`).join("\n");

  const header = `*─── ❲ سـجـل الأعـطـال الـفـنـيـة ❳ ───*\n\nتـم رصـد ( ${errors.length} ) ثـغـرة مـحـتـمـلـة فـي الـنـظـام:\n`;
  const footer = `\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`;

  m.reply(header + res + footer);
};

run.command = ["الايرورات", "errors", "الأخطاء"];
run.usage = ["الايرورات"];
run.category = "owner";
run.owner = true;

export default run;
