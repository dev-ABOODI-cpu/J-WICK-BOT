const MENU_TIMEOUT = 120000;

const CATEGORIES = [
    [1, 'التـحـمـيـل', 'downloads', '∟'],
    [2, 'الـمـجـمـوعـات', 'group', '∟'],
    [3, 'الـمـلـصـقـات', 'sticker', '∟'],
    [4, 'الـمـطـوريـن', 'owner', '∟'],
    [5, 'امـثـلـه', 'example', '∟'],
    [6, 'الـادوات', 'tools', '∟'],
    [7, 'الـبـحـث', 'search', '∟'],
    [8, 'الادمــن', 'admin', '∟'],
    [9, 'الالــعـاب', 'games', '∟'],
    [10, 'الچيف', 'gif', '∟'],
    [11, 'الـبــنـك', 'bank', '∟'],
    [12, 'الـذكـاء الاصـطـنـاعـي', 'ai', '∟'],
    [13, 'الـبـوتـات الـفـرعـي', 'sub', '∟'],
    [14, 'مـعـلومـات الـبـوت', 'info', '∟'],
    [15, 'الـالــقــاب', 'nicknames', '∟'],
    [16, 'الاسـلامـيـات', 'Islamic', '∟'],
    [17, 'أخــرى', 'other', '∟']
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
        newsletterName: '𝗝 𝗪𝗶𝗰𝗸 ~ 𝐃𝐚𝐬𝐡𝐛𝐨𝐚𝐫𝐝',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝗜𝗡 - 𝗝 𝗪𝗶𝗰𝗸 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 𝟯.𝟬",
        body: "PREMIUM TEXT-INTERFACE & BY DEV ABOODI",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

const run = async (m, { conn, bot }) => {
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

╭─⚏────────────
│ 🕸 المستخدم: @${m.sender.split("@")[0]}
│ 🕷 النشاط: ${Math.floor(process.uptime() / 3600)}h
╰─⚏────────────

  ┌── الأقسام المتوفرة ──
${CATEGORIES.map(c => `  │ ${c[0].toString().padStart(2, '0')} ⊸ قـسـم ${c[1]}`).join('\n')}
  └──────────────

> *يرجى الرد برقم القسم المطلوب*`.trim();

    const msg = await conn.sendMessage(m.chat, {
        text: txt,
        contextInfo: context(m.sender, getImg(bot))
    }, { quoted: global.reply_status });

    global.menus[msg.key.id] = { cats, chatId: m.chat, time: Date.now() };
};

run.before = async (m, { conn, bot }) => {
    clean();

    const menuData = global.menus[m.quoted?.id];
    if (!menuData || !m.text) return false;

    const selectedNumber = parseInt(m.text.trim());
    if (isNaN(selectedNumber)) return false;

    const cat = getCat(selectedNumber);
    if (!cat) return false;

    const categoryKey = cat[2].toLowerCase().trim();
    const cmds = menuData.cats[categoryKey];

    if (!cmds?.length) {
        await conn.sendMessage(m.chat, { text: `⚠️ القسم المختار فارغ حالياً.` }, { quoted: global.reply_status });
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

    const cmdsList = finalCmds.map(name => `  ├╼ /${name}`).join('\n');

    const resultTxt = `
╭── ❲ ${cat[1]} ❳
│
${cmdsList}
│
╰── 𝗜𝗡 - 𝗝 𝗪𝗶𝗰𝗸 ᥫ᭡.ִֶָ𓂃

> *وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ*`.trim();

    await conn.sendMessage(m.chat, {
        text: resultTxt,
        contextInfo: context(m.sender, getImg(bot))
    }, { quoted: global.reply_status });

    return true;
};

run.command = ['الاوامر', 'menu', 'اوامر'];
export default run;
