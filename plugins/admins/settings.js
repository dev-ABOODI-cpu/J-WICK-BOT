/* ─── ❲ لـوحـة تـحـكـم الـنـظـام : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

async function handler(m, { conn, command, args }) {
    const chatId = m.chat;
    const subCmd = args[0]?.toLowerCase();

    const menu = `
─── ❲ نـظـام الـتـفـعـيـل والـتـشـغـيـل ❳ ───

| .تفعيل ايقاف_الترحيب
| البوت سيتوقف عن إرسال رسائل الترحيب

| .تفعيل تشغيل_الترحيب
| البوت سيرحب بالأعضاء الجدد

| .تفعيل تشغيل_الادمن
| سيتم الاستجابة للمشرفين فقط

| .تفعيل ايقاف_الادمن
| سيتم الاستجابة لجميع الأعضاء

| .تفعيل مطور_فقط
| البوت سيتفاعل مع المطورين فقط عامة

| .تفعيل مطور_عام
| البوت سيتفاعل مع الجميع عامة

| .تفعيل تشغيل_مضاد_الروابط
| سيتم تفعيل نظام حماية الروابط

| .تفعيل ايقاف_مضاد_الروابط
| سيتم تعطيل نظام حماية الروابط

| .تفعيل ايقاف_خاص
| البوت سيعمل للمطورين فقط في الخاص

| .تفعيل تشغيل_خاص
| البوت سيعمل للجميع في الخاص

─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───
`.trim();

    if (!subCmd) {
        await conn.sendButton(m.chat, {
            bodyText: menu,
            footerText: "𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌",
            buttons: [
                { name: "quick_reply", params: { display_text: "ايقاف التنصيب", id: ".تفعيل ايقاف_الفرعي" } },
                { name: "quick_reply", params: { display_text: "تشغيل التنصيب", id: ".تفعيل تشغيل_الفرعي" } },
                { name: "quick_reply", params: { display_text: "ايقاف الترحيب", id: ".تفعيل ايقاف_الترحيب" } },
                { name: "quick_reply", params: { display_text: "تشغيل الترحيب", id: ".تفعيل تشغيل_الترحيب" } },
                { name: "quick_reply", params: { display_text: "تشغيل الادمن", id: ".تفعيل تشغيل_الادمن" } },
                { name: "quick_reply", params: { display_text: "ايقاف الادمن", id: ".تفعيل ايقاف_الادمن" } },
                { name: "quick_reply", params: { display_text: "مطور فقط", id: ".تفعيل مطور_فقط" } },
                { name: "quick_reply", params: { display_text: "مطور عام", id: ".تفعيل مطور_عام" } },
                { name: "quick_reply", params: { display_text: "تشغيل الحماية", id: ".تفعيل تشغيل_مضاد_الروابط" } },
                { name: "quick_reply", params: { display_text: "ايقاف الحماية", id: ".تفعيل ايقاف_مضاد_الروابط" } }
            ],
            mentions: [m.sender],
            newsletter: {
                name: '𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣',
                jid: '120363425546384005@newsletter'
            },
            interactiveConfig: {
                buttons_limits: 1,
                list_title: "قائمة التحكم",
                button_title: "اختر الإجراء",
            }
        }, m);
        return;
    }

    let result;
    
    switch (subCmd) {
        case 'ايقاف_الفرعي':
            if (!m.isOwner) return m.reply('── ❲ خـطأ ❳ ──\n\n| عذراً: هذا الأمر للمطور فقط');
            global.db.noSub = true;
            result = '── ❲ تـحـديـث ❳ ──\n\n| تم إيقاف تنصيب البوتات الفرعية بنجاح';
            break;
            
        case 'تشغيل_الفرعي':
            if (!m.isOwner) return m.reply('── ❲ خـطأ ❳ ──\n\n| عذراً: هذا الأمر للمطور فقط');
            global.db.noSub = false;
            result = '── ❲ تـحـديـث ❳ ──\n\n| تم تفعيل تنصيب البوتات الفرعية بنجاح';
            break;

        case 'ايقاف_الترحيب':
            if (!m.isOwner && !m.isAdmin) return m.reply('── ❲ خـطأ ❳ ──\n\n| عذراً: هذا الأمر للمشرفين فقط');
            global.db.groups[chatId].noWelcome = true;
            result = '── ❲ تـحـديـث ❳ ──\n\n| تم تعطيل نظام الترحيب في هذه المجموعة';
            break;
            
        case 'تشغيل_الترحيب':
            if (!m.isOwner && !m.isAdmin) return m.reply('── ❲ خـطأ ❳ ──\n\n| عذراً: هذا الأمر للمشرفين فقط');
            global.db.groups[chatId].noWelcome = false;
            result = '── ❲ تـحـديـث ❳ ──\n\n| تم تفعيل نظام الترحيب في هذه المجموعة';
            break;

        case 'تشغيل_مضاد_الروابط':
            if (!m.isOwner && !m.isAdmin) return m.reply('── ❲ خـطأ ❳ ──\n\n| عذراً: هذا الأمر للمشرفين فقط');
            global.db.groups[chatId].antiLink = true;
            result = '── ❲ تـحـديـث ❳ ──\n\n| تم تفعيل نظام الحماية من الروابط';
            break;

        case 'ايقاف_خاص':
            if (!m.isOwner) return m.reply('── ❲ خـطأ ❳ ──\n\n| عذراً: هذا الأمر للمطورين فقط');
            global.db.dev = true;
            result = '── ❲ تـحـديـث ❳ ──\n\n| تم قصر استخدام البوت في الخاص على المطورين';
            break;
            
        case 'تشغيل_خاص':
            if (!m.isOwner) return m.reply('── ❲ خـطأ ❳ ──\n\n| عذراً: هذا الأمر للمطورين فقط');
            global.db.dev = false;
            result = '── ❲ تـحـديـث ❳ ──\n\n| تم إتاحة استخدام البوت في الخاص للجميع';
            break;

        default:
            return m.reply(menu);
    }
    
    if (result) {
        m.reply(`${result}\n\n─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ───`);
    }
}

handler.usage = ['تفعيل'];
handler.category = 'admin';
handler.command = ['تفعيل', 'config', 'settings'];

export default handler;
