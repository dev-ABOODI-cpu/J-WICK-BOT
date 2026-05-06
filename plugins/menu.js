const MENU_TIMEOUT = 120000;

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

if (!global.menus) global.menus = {};

const clean = () => {
    const now = Date.now();
    Object.keys(global.menus).forEach(k => {
        if (now - global.menus[k].time > MENU_TIMEOUT) delete global.menus[k];
    });
};

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
        body: "𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝚋𝚘𝚝 𝚝𝚑𝚊𝚝 𝚒𝚜 𝚎𝚊𝚜𝚢 𝚝𝚘 𝚖𝚘𝚍𝚒𝚏𝚢 𝚊𝚗𝘥 𝚟𝚎𝚛𝚢 𝚏𝚊𝚜𝚝",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

const menu = async (m, { conn, bot }) => {
    clean();

    const cmds = await bot.getAllCommands();
    const cats = {};

    cmds.forEach(c => {
        if (!c.usage && !c.command && !c.cmd && !c.name) return;
        const cat = (c.category || 'other').toLowerCase().trim();
        if (!cats[cat]) cats[cat] = [];
        cats[cat].push(c);
    });

    const txt = `
*قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنْفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا*
╭─┈─┈─┈─⟞🕷⟝─┈─┈─┈─╮
${CATEGORIES.map(c => `┃¦︙${c[0]} • *قـسـم ${c[1]} ${c[3]}*`).join('\n')}
╰─┈─┈─┈─⟞🕷⟝─┈─┈─┈─╯
> *رد عـلـي الـرسـالـه بـ رقـم الـقـسـم فـقـط بـدون نـقـطـه*`;

    const msg = await conn.sendMessage(m.chat, {
        text: txt,
        contextInfo: context(m.sender, getImg(bot))
    }, { quoted: reply_status });

    global.menus[msg.key.id] = { cats, chatId: m.chat, time: Date.now() };
};

menu.before = async (m, { conn, bot }) => {
    clean();

    const menuData = global.menus[m.quoted?.id];
    if (!menuData) return false;

    const cat = getCat(parseInt(m.text));
    if (!cat) {
        await conn.sendMessage(m.chat, { text: '*❌≥ اختار رقم من القائمة بس*' }, { quoted: reply_status });
        return true;
    }

    const cmds = menuData.cats[cat[2]];
    if (!cmds?.length) {
        await conn.sendMessage(m.chat, { text: '*❌≥ القسم فاضي*' }, { quoted: reply_status });
        return true;
    }

    await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.quoted.id, fromMe: true } });
    delete global.menus[m.quoted.id];

    let finalCmds = [];

    cmds.forEach(c => {
        let rawItems = c.usage || c.command || c.cmd || c.name || [];
        if (!Array.isArray(rawItems)) rawItems = [rawItems];

        rawItems.forEach(item => {
            let raw = item;
            if (raw instanceof RegExp || (typeof raw === 'string' && raw.includes('^'))) {
                let match = raw.toString().match(/\((.*?)\|/);
                raw = match ? match[1] : raw.toString().replace(/[^a-z0-9أ-ي]/gi, '');
            }
            if (raw && !finalCmds.includes(raw)) finalCmds.push(raw);
        });
    });

    const cmdsList = finalCmds.map(name => `┃${cat[3]} /${name}`).join('\n');

    await conn.sendMessage(m.chat, {
        text: `
╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙ قـسـم ${cat[1]} ${cat[3]}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯

${cmdsList}

╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙𝐈𝐍 ~ ${bot.config.info.nameBot}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯
> *وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ*`.trim(),
        contextInfo: context(m.sender, getImg(bot))
    }, { quoted: reply_status });

    return true;
};

menu.command = ['الاوامر', 'menu', 'اوامر'];
export default menu;
