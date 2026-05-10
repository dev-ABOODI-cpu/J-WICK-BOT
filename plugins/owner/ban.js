/* ─── ❲ نـظـام الـعـقـوبـات : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

import fs from 'fs';
import path from 'path';

const ff = async (m, { conn, text, command }) => {
    let target = m.mentionedJid?.[0] || m.quoted?.sender;
    
    // محاولة استخراج الرقم لو تم كتابته يدوياً مع العلامة
    if (!target && text?.includes('@')) {
        target = text.replace('@', '').trim() + '@s.whatsapp.net';
    }
    
    if (!target) {
        return m.reply(`*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى مـنـشـنـة الـمـسـتـهـدف أو الـرد عـلـى رسـالـتـه لـتـنـفـيذ الإجـراء\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
    }
    
    const jid = await m.lid2jid(target);
    const user = global.db.users[jid]; // هنا الـ UltraDB هيتكفل بالباقي
    
    const isUnban = command === "فك_حظر" || command === "الغاء_الحظر" || command === "unban";
    
    // مـنـطـق إلـغـاء الـحـظر (الـعـفـو)
    if (isUnban) {
        if (user && user.banned) {
            delete user.banned; // الحذف هنا بيسمع فوراً في الـ Database
            await conn.sendMessage(m.chat, { 
                text: `*─── ❲ تـم الـعـفـو ❳ ───*\n\nتـم إلـغـاء الـقـيـود عـن الـعـضـو : @${target.split('@')[0]}\nبـإمـكـانـه الآن اسـتـخـدام مـحركـات الـنـظـام بـشـكـل طـبـيـعـي\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`, 
                mentions: [target] 
            });
        } else {
            m.reply(`*─── ❲ تـنـبـيـه ❳ ───*\n\nهـذا الـمـسـتـخـدم لا يـخـضـع لأي قـيـود حـالـيـاً\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
        }
        return;
    }
    
    // مـنـطـق الـحـظـر (الـنـفـي)
    user.banned = true;
    await conn.sendMessage(m.chat, { 
        text: `*─── ❲ إنـفـاذ الـحـظـر ❳ ───*\n\nتـم حـظـر الـعـضـو : @${target.split('@')[0]}\nلـن يـسـتـجـيـب الـنـظـام لأي أوامـر مـن هـذا الـحـسـاب بـعـد الآن\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`, 
        mentions: [target] 
    });
};

ff.usage = ["حظر", "فك_حظر"];
ff.category = "owner";
ff.command = ["حظر", "فك_حظر", "الغاء_الحظر", "ban", "unban"];
ff.owner = true;

export default ff;
