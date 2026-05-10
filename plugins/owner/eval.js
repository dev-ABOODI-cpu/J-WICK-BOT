/* ─── ❲ مُـخـتـبـر الـأنـظـمـة : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

import { createRequire } from 'module';
import { format } from 'util';

const handler = async (m, { bot, conn }) => {
    const body = m.text || '';
    // استخراج الكود البرمجي مع تجاهل الرمز (=> أو >)
    const codeText = body.replace(/^(>|=>)\s*/, '').trim();

    if (!codeText) return m.reply('*─── ❲ مـحرك الاخـتـبـار ❳ ───*\n\nيُـرجـى إدخـال الـكـود الـبـرمـجـي لـتـنـفـيذه مـبـاشـرة\nمـثـال : `=> m`\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');

    try {
        const require = createRequire(import.meta.url);
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

        // تجهيز البيئة البرمجية والمتغيرات المتاحة للاختبار
        const vars = {
            conn,
            bot,
            m,
            reply: m.reply.bind(m),
            print: (...args) => m.reply(format(...args)),
            require,
            process,
            Array: CustomArray
        };

        // إذا بدأ الكود بـ => نقوم بإرجاع النتيجة تلقائياً
        let processedCode = body.startsWith('=>') ? `return (${codeText})` : codeText;

        const executeCode = new AsyncFunction(...Object.keys(vars), processedCode);
        let result = await executeCode(...Object.values(vars));

        // عرض النتيجة إذا لم تكن فارغة
        if (result !== undefined) {
            await m.reply(`*─── ❲ نـتـيـجـة الـتـنـفـيـذ ❳ ───*\n\n${format(result)}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
        }
    } catch (err) {
        // عرض الخطأ البرمجي في حال حدوثه
        await m.reply(`*─── ❲ خـطـأ بـرمـجـي ❳ ───*\n\n\`\`\`${err.message || err.stack || err}\`\`\`\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
    }
};

// فئة مخصصة للتحكم في استهلاك الذاكرة أثناء إنشاء المصفوفات
class CustomArray extends Array {
    constructor(...args) {
        if (args.length === 1 && typeof args[0] === 'number') {
            super(Math.min(args[0], 10000));
        } else {
            super(...args);
        }
    }
}

handler.command = [">", "=>"];
handler.category = "owner";
handler.owner = true;
handler.usePrefix = false; // تشغيل مباشر بدون بادئة

export default handler;
