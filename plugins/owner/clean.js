/* ─── ❲ تـطـهـيـر ذاكـرة الـنـظـام : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

import { execSync } from "child_process";

const handler = async (m) => {
  try {
    // تفاعل أولي لبدء العملية
    m.react("🧹");
    m.reply("*─── ❲ جـاري الـتـطـهـيـر ❳ ───*\n\nيـتـم الآن فـحـص وتـنـظـيـف مـلـفـات الـجـلـسـة الـزائـدة\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*");

    // تنفيذ أمر المسح في نظام التشغيل وحساب عدد الملفات
    const result = execSync(
      'files=$(ls session/pre-key-* session/device-list-* 2>/dev/null | wc -l); rm -rf session/pre-key-* session/device-list-* 2>/dev/null; echo "$files"',
      { encoding: 'utf-8' }
    );
    
    const count = parseInt(result.trim()) || 0;
    
    m.react("✅");
    await m.reply(`*─── ❲ تـمـت الـتـصـفـيـة ❳ ───*\n\nتـم حـذف جـمـيـع الـمـلـفـات الـمـؤقـتـة بـنـجـاح\n╰╼ عـدد الـمـلـفـات الـمـزاحـة : [ ${count} ]\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);

  } catch (error) {
    console.error('ERROR:', error);
    await m.reply(`*─── ❲ خـطـأ فـي الـنـظـام ❳ ───*\n\nتـعـذر إتـمـام عـمـلـيـة الـتـنـظـيف\n\n\`\`\`${error.message}\`\`\``);
  }
};

handler.usage = ["تنظيف"];
handler.category = "owner";
handler.command = ["تنظيف", "تطهير", "clean"];
handler.owner = true;

export default handler;
