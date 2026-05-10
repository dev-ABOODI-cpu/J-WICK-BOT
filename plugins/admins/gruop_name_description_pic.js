/* ─── ❲ إدارة هـويـة الـمـجـموعـة : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const handler = async (m, { conn, text, command }) => {
    // 1. تفاعل أولي لبدء المعالجة
    m.react("🛠️");

    const actions = {
        'جروب_اسم': async () => {
            if (!text) return m.reply('*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى كـتـابـة الـاسـم الـجـديـد بـعـد الأمـر.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
            await conn.groupUpdateSubject(m.chat, text);
            m.reply(`*─── ❲ تـم الـتـغـيـيـر ❳ ───*\n\n✅ تـم تـحـديـث اسـم الـمـجـموعـة لـلـآن:\n*${text}*\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
        },

        'جروب_وصف': async () => {
            if (!text) return m.reply('*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى كـتـابـة الـوصـف الـجـديـد بـعـد الأمـر.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
            await conn.groupUpdateDescription(m.chat, text);
            m.reply('*─── ❲ تـم الـتـغـيـيـر ❳ ───*\n\n✅ تـم تـحـديـث وصـف الـمـجـموعـة بـنـجـاح.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
        },

        'جروب_صوره': async () => {
            const q = m.quoted ? m.quoted : m;
            const mime = (q.msg || q).mimetype || '';

            if (!/image/.test(mime)) {
                return m.reply('*─── ❲ تـنـبـيـه ❳ ───*\n\n🖼️ يُـرجـى الـرد عـلـى صـورة لـتـعـيـيـنـهـا كـخـلـفـيـة لـلـمـجـموعـة.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
            }

            m.react("⏳"); // تفاعل التحميل
            const media = await q.download();
            await conn.updateProfilePicture(m.chat, media);
            m.reply('*─── ❲ تـم الـتـغـيـيـر ❳ ───*\n\n✅ تـم تـحـديـث صـورة الـمـجـموعـة بـنـجـاح.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
        }
    };

    const action = actions[command];
    if (!action) return;

    try {
        await action();
        m.react("✅");
    } catch (e) {
        console.error(e);
        m.react("❌");
        m.reply(`*─── ❲ خـطـأ تـقـنـي ❳ ───*\n\nفـشـل تـنـفـيذ الـإجـراء، تـأكـد مـن صـلاحـيـات الـبـوت والـحـجـم.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
    }
};

handler.command = ['جروب_اسم', 'جروب_وصف', 'جروب_صوره'];
handler.category = "admin";
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
