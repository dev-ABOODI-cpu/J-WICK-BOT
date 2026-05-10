/* ─── ❲ نـظـام الـكـتـم : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const isOwner = (userId, bot) => bot.config?.owners?.some(o => o.jid === userId || o.lid === userId);

const handler = async (m, { conn, command, bot }) => {
    let target = m.mentionedJid?.[0];
    
    if (target && typeof m.lid2jid === 'function') {
        target = await m.lid2jid(target);
    }
    
    if (!target && m.quoted) {
        target = typeof m.lid2jid === 'function' ? await m.lid2jid(m.quoted.sender) : m.quoted.sender;
    }
    
    if (!target) return m.reply(`─── ❲ تـنـبـيـه ❳ ───\n\n| الاسـتـخـدام : ${command} @user\n| أو قـم بـالـرد عـلـى رسـالـتـه\n\n─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`);
    
    if (isOwner(target, bot)) return m.reply(`─── ❲ فـشـل الـأمـر ❳ ───\n\n| خـطأ : لـا يـمـكـن تـطـبـيـق الـكـتـم عـلـى الـمـطـور\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ───`);
    
    const group = global.db.groups[m.chat] ||= {};
    const muteList = group.mute ||= [];
    const isMuted = muteList.includes(target);
    
    if (command === "كتم") {
        if (isMuted) return conn.sendMessage(m.chat, { text: `─── ❲ نـظـام الـكـتـم ❳ ───\n\n| الـمـسـتـخـدم : @${target.split('@')[0]}\n| الـحـالـة : مـكـتـوم بـالـفـعـل\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ───`, mentions: [target] });

        muteList.push(target);
        await conn.sendMessage(m.chat, { text: `─── ❲ نـظـام الـكـتـم ❳ ───\n\n| تـم كـتـم : @${target.split('@')[0]}\n| الـإجـراء : سـيـتـم حـذف رسـائـلـه تـلـقـائـيـاً\n\n─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`, mentions: [target] });
    } 
    
    else if (command === "فك_كتم") {
        if (!isMuted) return conn.sendMessage(m.chat, { text: `─── ❲ نـظـام الـكـتـم ❳ ───\n\n| الـمـسـتـخـدم : @${target.split('@')[0]}\n| الـحـالـة : لـيـس مـكـتـومـاً\n\n─── 𝐑𝐔𝐒𝐓𝐀𝐌 ───`, mentions: [target] });

        group.mute = muteList.filter(id => id !== target);
        await conn.sendMessage(m.chat, { text: `─── ❲ نـظـام الـكـتـم ❳ ───\n\n| تـم فـك الـكـتـم : @${target.split('@')[0]}\n| الـإجـراء : يـمـكـنـه الـآن الـتـحـدث بـحـريـة\n\n─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`, mentions: [target] });
    }
};

// الـمـعـالـج الـمـسـؤول عـن حـذف رسـائـل الـمـكـتـومـيـن
handler.before = async (m, { conn, bot }) => {
    if (!m.isGroup || !m.sender) return;
    if (m.isOwner || m.isAdmin || isOwner(m.sender, bot)) return;
    
    const muteList = global.db?.groups?.[m.chat]?.mute;
    if (!muteList || muteList.length === 0) return;
    
    if (muteList.includes(m.sender)) {
        await conn.sendMessage(m.chat, { delete: m.key });
        return false; // لـمـنـع الـبـوت مـن مـعـالـجـة الأمـر كـرسـالـة عـاديـة
    }
};

handler.command = ["كتم", "فك_كتم"];
handler.admin = true;
handler.group = true;

export default handler;
