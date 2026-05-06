const CATEGORIES = [
    [1, 'التـحـمـيـل', 'downloads', '🕸'],
    [2, 'الـمـجـمـوعـات', 'group', '🕸'],
    [3, 'الـمـلـصـقـات', 'sticker', '🕸'],
    [4, 'الـمـطـوريـن', 'owner', '🕸'],
    [5, 'امـثـلـه', 'example', '🕸'],
    [6, 'الـادوات', 'tools', '🕸'],
    [7, 'الـبـحـث', 'search', '🕸'],
    [8, 'الادمــن', 'admin', '🕸'],
    [9, 'الالــعـاب', 'games', '🕸'],
    [10, 'الچيف', 'gif', '🕸'],
    [11, 'الـبــنـك', 'bank', '🕸'],
    [12, 'الـذكـاء الاصـطـنـاعـي', 'ai', '🕸'],
    [13, 'الـبـوتـات الـفـرعـي', 'sub', '🕸'],
    [14, 'مـعـلومـات الـبـوت', 'info', '🕸'],
    [15, 'الـالــقــاب', 'nicknames', '🕸'],
    [16, 'أخــرى', 'other', '🕸'],
    [17, 'الاسـلامـيـات', 'Islamic', '🕸']
];

const getCat = n => CATEGORIES.find(c => c[0] === n);

const getImg = (bot) => {
    const { images } = bot.config.info;
    return Array.isArray(images) ? images[Math.floor(Math.random() * images.length)] : images;
};

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425546384005@newsletter',
        newsletterName: '𝗝 𝗪𝗶𝗰𝗸 ~ 𝐂𝐡𝐚𝐧𝐧𝗲𝐥 🕷️',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝗜𝗡 - 𝗝 𝗪𝗶𝗰𝗸 🕷 | 𝐁𝐨𝐭 𝐢𝐬 𝐛𝐮𝐢𝐥𝐭 𝐨𝐧 𝐭𝐡𝐞 𝐖𝐒/𝐈𝐍 𝐟𝐫𝐚𝐦𝐞𝐰𝐨𝐫𝐤",
        body: "𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝚋𝚘𝚝 𝚝𝚑𝚊𝚝 𝚒𝚜 𝚎𝚊𝚜𝚢 𝚝𝚘 𝚖𝚘𝚍𝚒𝚏𝚢 𝚊𝚗𝚍 𝚟𝚎𝚛𝚢 𝚏𝚊𝚜𝚝",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

async function handler(m, { conn, bot, command, args }) {
    const selected = parseInt(args[0]);
    const now = new Date();
    const uptimeSeconds = process.uptime();
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    const uptimeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const date = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    if (!selected && !args[0]) {
        const sections = [{
            title: "🕸 ~ الاقـسـام ~ 🕸",
            rows: CATEGORIES.map(c => ({
                title: `${c[0]} ~ ${c[1]} ${c[3]}`,
                description: `اضغط لعرض أوامر قسم ${c[1]}`,
                id: `.${command} ${c[0]}`
            }))
        }];

        const menuText = `
*قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا*
╭─┈─┈─┈─⟞🕷⟝─┈─┈─┈─╮
┃ ⌯🍂︙ اهـلا → *[ @${m.sender.split("@")[0]} ]*
┃ ⌯🚀︙ الـتشـغـيـل → ${uptimeFormatted}
┃ ⌯👾︙ الـتـاريـخ → ${date} - ${time}
╰─┈─┈─┈─⟞🕷⟝─┈─┈─┈─╯
> *_اختار قسم من القائمة عشان يبعتلك اوامر القسم_*`;
        
        await conn.sendButtonNormal(m.chat, {
            media: { url: "https://i.postimg.cc/hPgCbTrQ/78177908917fcd7be836153ed85f1073-webp.webp" },
            mediaType: 'image',
            caption: menuText,
            buttons: [{
                name: "single_select",
                params: {
                    title: "🍂✨",
                    sections: sections
                }
            }],
            mentions: [m.sender],
            newsletter: {
                name: '𝗝 𝗪𝗶𝗰𝗸 ~ 𝐂𝐡𝐚𝐧𝐧𝗲𝐥 🕷️',
                jid: '120363425546384005@newsletter'
            }
        }, global.reply_status);
        return;
    }

    const cat = getCat(selected);
    if (!cat) {
        await conn.sendMessage(m.chat, { text: '*❌ اختار رقم صحيح من 1 لـ 17*', contextInfo: context(m.sender, getImg(bot)) }, { quoted: m });
        return;
    }

    const cmds = await bot.getAllCommands();
    const categoryCmds = cmds.filter(c => c.category === cat[2]);
    
    if (!categoryCmds.length) {
        await conn.sendMessage(m.chat, { text: '*❌ القسم فاضي*', contextInfo: context(m.sender, getImg(bot)) }, { quoted: m });
        return;
    }

    const cmdsList = categoryCmds.map(c => `${cat[3]} /${c.usage?.join(`\n${cat[3]} /`)}`).join('\n');

    await conn.sendMessage(m.chat, { text: `
╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙ قـسـم ${cat[1]} ${cat[3]}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯

${cmdsList}

╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙𝐈𝐍 ~ ${bot?.config?.info?.nameBot || 'IN J WICK'}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯
> *وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ*`.trim(), contextInfo: context(m.sender, getImg(bot)) }, { quoted: m });
}

handler.command = ['القائمة', 'المهام'];
export default handler;
