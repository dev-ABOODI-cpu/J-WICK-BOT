/* ─── ❲ رادار الـمـنـشن : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn, args }) => {

    const metadata = await conn.groupMetadata(m.chat);
    const participants = metadata.participants;
    
    // تصنيف الحضور
    const groupAdmins = participants.filter(p => p.admin).map(p => p.id);
    const groupMembers = participants.filter(p => !p.admin).map(p => p.id);

    // خلط القوائم لإضافة طابع عشوائي
    const shuffledAdmins = [...groupAdmins].sort(() => Math.random() - 0.5);
    const shuffledMembers = [...groupMembers].sort(() => Math.random() - 0.5);

    let messageText = `─── ❲ نـداء الـقـيـادة : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ───\n\n`;
    messageText += `| الـمـجـموعـة : ${metadata.subject}\n`;
    messageText += `| الـتـاريـخ : ${new Date().toLocaleDateString('ar-EG')}\n\n`;

    // قسم المشرفين
    messageText += `『 الـمـشـرفـيـن ⁝ ${shuffledAdmins.length} 』\n`;
    messageText += "┌───────────────────\n";
    shuffledAdmins.forEach((admin, index) => {
        messageText += `│ ${index + 1}. ⚡ @${admin.split('@')[0]}\n`;
    });
    messageText += "└───────────────────\n\n";

    // قسم الأعضاء
    messageText += `『 الـأعـضـاء ⁝ ${shuffledMembers.length} 』\n`;
    messageText += "┌───────────────────\n";
    shuffledMembers.forEach((member, index) => {
        messageText += `│ ${index + 1}. @${member.split('@')[0]}\n`;
    });
    messageText += "└───────────────────\n\n";

    messageText += `| إجـمـالـي الـحـضـور : [ ${participants.length} ]\n\n`;
    messageText += `─── 𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈 ☣︎ ───`;

    return conn.sendMessage(m.chat, { 
        text: messageText, 
        mentions: participants.map(p => p.id)
    }, { quoted: m });
};

handler.usage = ["منشن"];
handler.category = "admin";
handler.command = ["منشن", "منشنز", "mention", "نداء"];
handler.admin = true;
handler.group = true;

export default handler;
