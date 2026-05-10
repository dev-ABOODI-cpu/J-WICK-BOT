/* ─── ❲ مُـحـرك الـنـظـام : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

import { execSync } from 'child_process';

const handler = async (m, { text }) => {
    // التحقق من وجود أمر لتنفيذه
    if (!text) {
        return m.reply('*─── ❲ مـحـرك الـأوامـر ❳ ───*\n\nيُـرجـى إدخـال أمـر الـنـظـام لـتـنـفـيذه مـبـاشـرة\nمـثـال : `$ npm i axios`\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
    }

    try {
        // تفاعل البرق للإشارة إلى بدء المعالجة في السيرفر
        m.react("⚡");

        // تنفيذ الأمر في بيئة الـ Shell وجلب النتيجة
        const result = execSync(text, { encoding: 'utf-8' });

        m.react("✅");
        
        // إرسال النتيجة داخل كتلة نصية برمجية لسهولة القراءة
        await m.reply(`*─── ❲ مـخـرجـات الـنـظـام ❳ ───*\n\n\`\`\`${result}\`\`\`\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);

    } catch (error) {
        // عرض الخطأ في حال فشل تنفيذ الأمر في السيرفر
        m.react("❌");
        await m.reply(`*─── ❲ تـنـبـيـه الـنـظـام ❳ ───*\n\nتـعـذر تـنـفـيذ الأمـر الـمـطـلـوب:\n\n\`\`\`${error.message}\`\`\`\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
    }
};

handler.command = ["$"];
handler.category = "owner";
handler.owner = true;
handler.usePrefix = false; // تشغيل مباشر بالرمز $

export default handler;
