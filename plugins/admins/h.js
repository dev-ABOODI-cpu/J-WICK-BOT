const h = async (m, { text, bot, conn }) => {
    try {
        // التحقق من وجود كائن bot وخصائصه لتجنب الأخطاء
        const images = bot?.config?.info?.images || [];
        const thumbnailUrl = Array.isArray(images) && images.length > 0
            ? images[Math.floor(Math.random() * images.length)]
            : "https://i.postimg.cc/3x08Tky0/d1c5ab1f9e99de515d02e22704f8c845.jpg";

        const botName = bot?.config?.info?.nameBot || "WhatsApp Bot";

        const adReply = {
            title: botName,
            body: " ", // تم تغيير null إلى مسافة لتجنب أخطاء الإرسال
            thumbnailUrl: thumbnailUrl,
            mediaType: 1,
            renderLargerThumbnail: false
        };

        const customText = text || "ﷺ";

        // جلب أعضاء القروب
        const groupMetadata = await conn.groupMetadata(m.chat).catch(() => null);
        if (!groupMetadata) {
            return m.reply("❌ لم أتمكن من جلب بيانات المجموعة، تأكد من أن البوت مشرف.");
        }
        
        const participants = groupMetadata.participants.map(v => v.id);

        // 1. لو مفيش ريبلاي
        if (!m.quoted) {
            return await conn.sendMessage(m.chat, {
                text: customText,
                mentions: participants,
                contextInfo: {
                    externalAdReply: adReply
                }
            });
        }

        // 2. لو فيه ريبلاي → ننسخ نفس الرسالة ونضيف عليها المنشن
        await conn.sendMessage(m.chat, {
            text: m.quoted.text || customText,
            mentions: participants,
            contextInfo: {
                externalAdReply: adReply
            }
        });

    } catch (err) {
        console.error("Error in 'h' command:", err);
        await m.reply(`❌ حدث خطأ: ${err.message}`);
    }
};

h.usage = ["مخفي"];
h.category = "admin";
h.command = ['مخفي', 'h'];
h.group = true;
h.admin = true;
h.usePrefix = false;

export default h;
