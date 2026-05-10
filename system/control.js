import fs from "fs";
import path from "path";

const group = async (ctx, event, eventType) => {
    try {
        if (!event?.participants) return null;

        const participants = event.participants.filter(p => p?.phoneNumber).map(p => p.phoneNumber);
        const author = event.author;
        let txt;

        const users = participants.length 
            ? participants.map(p => '@' + p.split('@')[0]).join(' و ') 
            : 'مـسـتـخـدم غـيـر مـعـروف';
        const authorTag = author ? '@' + author.split('@')[0] : 'الـنـظـام';

        // نصوص الترحيب والفعاليات بنمط رستم الفخم
        const messages = {
            add: `*─── ❲ تـرحـيـب : انـضـمـام جـديـد ❳ ───*\n\nنـورت المـجـمـوعـة يـا ${users}\nبـواسـطـة الـمـشـرف : ${authorTag}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
            remove: `*─── ❲ وداع : مـغـادرة الـمـجـمـوعـة ❳ ───*\n\nتـم خـروج أو إزالـة : ${users}\nبـواسـطـة الـمـشـرف : ${authorTag}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
            promote: `*─── ❲ تـرقـيـة : مـشـرف جـديـد ❳ ───*\n\nمـبـروك اعـتـلاء مـنـصـب الإدارة : ${users}\nبـواسـطـة : ${authorTag}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
            demote: `*─── ❲ تـنـزيـل : سـحـب الإدارة ❳ ───*\n\nتـم إعـفـاء الـعـضـو مـن مـهـامـه : ${users}\nبـواسـطـة : ${authorTag}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`
        };

        txt = messages[eventType];
        if (!txt) return null;
        
        if (global.db.groups[event.chat].noWelcome === true) return 9999;

        // استخدام رابط صورة الفارس التي أرسلتها
        const img = "https://i.postimg.cc/RCnnx4mG/24368e09ba3db60ef4a923467c209dba.jpg";

        await ctx.sock.msgUrl(event.chat, txt, {
            img,
            title: "𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ 𝐒𝐘𝐒𝐓𝐄𝐌",
            body: "نـظـام إدارة المـجـمـوعـات الـمـتـكـامـل",
            mentions: author ? [author, ...participants] : participants,
            newsletter: {
                name: '𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥',
                jid: '120363425546384005@newsletter'
            },
            big: true
        });

    } catch (e) {
        console.error(e);
    }
    return null;
};

const access = async (msg, checkType, time) => {
    const conn = await msg.client();
    
    // جعل الكونتكت الظاهر في المنشن رصين وثابت
    const quoted = {
        key: {
            participant: `0@s.whatsapp.net`,
            remoteJid: 'status@broadcast',
            fromMe: false,
        },
        message: {
            contactMessage: {
                displayName: `𝐑𝐔𝐒𝐓𝐀𝐌 𝐒𝐘𝐒𝐓𝐄𝐌 🛡️`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:RUSTAM SYSTEM\nEND:VCARD`,
            },
        },
    };
    
    // رسائل التحذير بالنمط الجديد (امتداد حروف + زخارف خطية)
    const messages = {
        cooldown: `*─── ❲ تـنـبـيـه : فـتـرة انـتـظـار ❳ ───*\n\nيُـرجـى الانـتـظـار لـمـدة ${time || 'بـضـع'} ثـوانٍ قـبـل إرسـال الأمـر\nلـضـمـان اسـتـقـرار الـنـظـام ومـنـع الإغـراق\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
        owner: `*─── ❲ صـلاحـيـات المـطـور ❳ ───*\n\nهـذا الأمـر مـشـفـر ومـخـصـص فـقـط لـمـطـوري الـنـظـام\nلا تـمـلـك الإذن الـكـافـي للـوصـول إلـى هـذه الـقـاعـدة\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
        group: `*─── ❲ بـيـئـة المـجـمـوعـات ❳ ───*\n\nعـذراً، هـذا الأمـر يـتـطـلـب تـواجـدك داخـل مـجـمـوعـة\nيُـرجـى تـنـفـيـذ الـطـلـب فـي المـكـان المـخـصـص\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
        admin: `*─── ❲ رتـبـة الـمـشـرف ❳ ───*\n\nالـوصـول مـرفـوض، هـذه المـيـزة تـتـطـلـب صـلاحـيـات الإدارة\nتـواصـل مـع مـشـرف المـجـمـوعـة للـقـيـام بـذلـك\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
        private: `*─── ❲ الـمـحـادثـات الـخـاصـة ❳ ───*\n\nهـذا الأمـر يـعـمـل فـقـط فـي الـمـحـادثـات الـخـاصـة\nيُـرجـى تـجـربـتـه فـي خـاص الـبـوت\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
        botAdmin: `*─── ❲ رتـبـة الـبـوت ❳ ───*\n\nيـتـعـذر الـتـنـفـيذ، يـجـب رفـع الـبـوت مـشـرفـاً (Admin)\nلـيـتـمـكـن مـن تـأديـة الـمـهـام المـطـلـوبـة\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
        noSub: `*─── ❲ تـنـبـيـه : الـنـسـخـة ❳ ───*\n\nهـذا الأمـر مـتـوفـر فـقـط فـي الـنـسـخـة الأصـلـيـة\nيـمـكـنـك الانـضـمـام لـلـمـجـمـوعـة الـرسـمـيـة لـتـجـربـتـه\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
        disabled: `*─── ❲ حـالـة الأمـر : مـتـوقـف ❳ ───*\n\nعـذراً، هـذا الأمـر تـحـت الـصـيـانـة الـفـنـيـة حـالـيـاً\nسـيـعـود لـلـعـمـل فـي الـتـحـديـث الـقـادم\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`,
        error: `*─── ❲ خـطـأ فـنـي ❳ ───*\n\nحـدث خـلل غـيـر مـتـوقـع أثـنـاء مـعـالـجـة الـطـلـب\nيُـرجـى إبـلاغ المـطـور عـن هـذا الـخـطـأ لـمـعـالـجـتـه\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`
    };
    
    if (conn && messages[checkType]) {
        await conn.msgUrl(msg.chat, messages[checkType], {
            img: "https://i.postimg.cc/4xXDTfD2/b521a429a47dcb22d795cdb8ff21dee2.jpg",
            title: "𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ | 𝐀𝐥𝐞𝐫𝐭𝐬",
            body: "نـظـام الـتـنـبـيـهـات والـحـمـايـة",
            newsletter: {
                name: '𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥',
                jid: '120363425546384005@newsletter'
            },
            big: false
        }, quoted);
        return false;  
    }
    return null;  
};

export { access, group };
