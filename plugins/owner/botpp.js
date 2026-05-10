/* ─── ❲ تـحـديـث الـهـويـة الـبـصـريـة : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    if (!/image/.test(mime)) {
        return m.reply('*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى الـرد عـلـى الـصـورة الـمـراد اعـتـمـادهـا كـشـعـار لـلـمـحـرك\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
    }

    try {
        m.react("📸");
        const media = await q.download?.();
        if (!media) throw new Error('تـعـذر اسـتـخـراج الـبـيـانـات مـن الـصـورة');

        // استهداف معرف البوت المباشر
        const botJid = conn.user.id;

        await conn.updateProfilePicture(botJid, media);

        m.reply(`*─── ❲ تـم تـحـديـث الـشـعـار ❳ ───*\n\nتـم اعـتـمـاد الـهـويـة الـبـصـريـة الـجـديـدة بـنـجـاح\nتـحـيـاتـي لـك يـا *𝐃𝐄𝐕 ! 𝐀𝐁𝐎𝐎𝐃𝐈*\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
        
    } catch (error) {
        console.error('ERROR:', error);
        m.reply(`*─── ❲ خـطـأ فـي الـتـحـديـث ❳ ───*\n\n${error.message}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
    }
};

handler.help = ['botpp'];
handler.tags = ['owner'];
handler.command = ['ضع_صورة', 'botpp', 'ضع'];
handler.owner = true;

export default handler;
