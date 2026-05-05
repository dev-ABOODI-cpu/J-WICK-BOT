const handler = async (m, { conn }) => {
    // جلب بيانات المجموعة مع حماية لتجنب التوقف
    const metadata = await conn.groupMetadata(m.chat).catch(() => null);
    
    if (!metadata) {
        return conn.sendMessage(m.chat, { 
            text: "❌ حدث خطأ: تأكد من أن البوت موجود في المجموعة ولديه صلاحيات المشرف." 
        }, { quoted: m });
    }

    const participants = metadata.participants;
    const jids = participants.map(p => p.id);

    if (jids.length < 2) {
        return conn.sendMessage(m.chat, { 
            text: "⚠️ المجموعة صغيرة جداً! يجب أن تحتوي على الأقل على عضوين لتنفيذ الأمر." 
        }, { quoted: m });
    }

    // اختيار العريس عشوائياً
    let index1 = Math.floor(Math.random() * jids.length);
    let user1 = jids[index1];

    // اختيار العروسة والتأكد من أنها تختلف عن العريس
    let index2;
    do {
        index2 = Math.floor(Math.random() * jids.length);
    } while (index1 === index2);

    let user2 = jids[index2];

    // حساب النسب المئوية العشوائية
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;

    // صياغة الرسالة
    const textMsg = `
🥳 *مـبـروك الـزواج، نتمنى لكم كل التوفيق!* 🥳

🤵🏻 *العريس:* @${user1.split('@')[0]}
🌹 *نسبة حبه للعروسة:* ${num1}%

👰🏻‍♀️ *العروسة:* @${user2.split('@')[0]}
🌹 *نسبة حبها للعريس:* ${num2}%
`.trim();

    // إرسال الرسالة
    return conn.sendMessage(m.chat, { 
        text: textMsg, 
        mentions: [user1, user2] 
    }, { quoted: m });
};

handler.usage = ["زواج"];
handler.category = "group";
handler.command = ["زواج"];

export default handler;
