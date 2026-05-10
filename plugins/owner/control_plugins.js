/* ─── ❲ إدارة مـلـفـات الـنـظـام : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, bot, command }) => {
    const base = bot.config?.commandsPath || './plugins';
    const [cmd, target] = m.text.split(' ');
    
    // وظيفة جرد كافة الملفات البرمجية في النظام
    const listFiles = () => {
        const files = [];
        const walk = (dir) => {
            if (!fs.existsSync(dir)) return;
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const p = path.join(dir, item);
                if (fs.statSync(p).isDirectory()) walk(p);
                else if (item.endsWith('.js')) files.push(path.relative(base, p).replace(/\.js$/, ''));
            }
        };
        walk(base);
        return files.sort();
    };
    
    // وظيفة البحث الذكي عن مسار ملف معين
    const findFile = (name) => {
        const search = (dir) => {
            if (!fs.existsSync(dir)) return null;
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const p = path.join(dir, item);
                if (fs.statSync(p).isDirectory()) {
                    const found = search(p);
                    if (found) return found;
                } else if (item === `${name}.js`) return p;
            }
            return null;
        };
        return search(base);
    };
    
    if (command === 'اضافه_ملف') {
        if (!target) {
            const files = listFiles();
            let msg = `*─── ❲ جـرد مـلـفـات الـنـظـام ❳ ───*\n\nتـم الـعـثـور عـلـى ( ${files.length} ) مـلـف بـرمـجـي\n\n`;
            if (!files.length) {
                msg += '╰╼ الـنـظـام لا يـحـتـوي عـلـى مـلـفات حـالـيـاً';
            } else {
                for (let i = 0; i < files.length; i += 20) {
                    const chunk = files.slice(i, i + 20);
                    msg += `╭─╼ الـنـطـاق [ ${i+1} - ${Math.min(i+20, files.length)} ]\n`;
                    msg += chunk.map(f => `│ 📄 ${f}`).join('\n') + '\n╰──────────────────\n\n';
                }
                msg += `*الاسـتـخـدام :*\n.اضافه_ملف [المسار/الاسم]\n( يـجـب الـرد عـلـى الـكـود المـطـلـوب )`;
            }
            return m.reply(msg);
        }
        
        if (!m.quoted) return m.reply('*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى الـرد عـلـى الـكـود المـراد رفـعـه إلـى الـنـظـام\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
        const content = m.quoted.text || m.quoted.msg;
        if (!content) return m.reply('*─── ❲ خـطـأ ❳ ───*\n\nالـمـحـتـوى الـمـحـدد لا يـحـتـوي عـلـى كـود صـحـيـح\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*');
        
        const parts = target.split('/');
        const name = parts.pop();
        let dir = base;
        for (const p of parts) {
            dir = path.join(dir, p);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        }
        
        const filePath = path.join(dir, `${name}.js`);
        fs.writeFileSync(filePath, content);
        m.reply(`*─── ❲ تـم الـتـنـصـيـب ❳ ───*\n\nتـم رفـع الـمـلـف الـبـرمـجـي إلـى الـقـاعـدة\n╰╼ الـمـسـار : \`${path.relative(base, filePath)}\`\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
    }
    
    else if (command === 'حذف_ملف') {
        if (!target) {
            const files = listFiles();
            let msg = `*─── ❲ سـجـل إزالـة الـمـلـفـات ❳ ───*\n\nاخـتـر الـمـلـف المـراد تـطـهـيـره مـن الـنـظـام\n\n`;
            if (!files.length) {
                msg += '╰╼ لا تـوجـد مـلـفـات لـلـحـذف';
            } else {
                for (let i = 0; i < files.length; i += 20) {
                    const chunk = files.slice(i, i + 20);
                    msg += `╭─╼ الـقـائـمـة [ ${i+1} ]\n`;
                    msg += chunk.map(f => `│ 🗑️ ${f}`).join('\n') + '\n╰──────────────────\n\n';
                }
                msg += `*الاسـتـخـدام :*\n.حذف_ملف [المسار/الاسم]`;
            }
            return m.reply(msg);
        }
        
        let filePath = path.join(base, `${target}.js`);
        if (!fs.existsSync(filePath)) {
            filePath = findFile(target.split('/').pop());
        }
        
        if (!filePath || !fs.existsSync(filePath)) {
            return m.reply(`*─── ❲ خـطـأ ❳ ───*\n\nالـمـلـف الـمـطـلـوب [ ${target}.js ] غـيـر مـوجـود\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
        }
        
        fs.unlinkSync(filePath);
        
        // تنظيف المجلدات الفارغة لضمان ترتيب النظام
        const clean = (dir) => {
            if (dir === base) return;
            if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
                fs.rmdirSync(dir);
                clean(path.dirname(dir));
            }
        };
        clean(path.dirname(filePath));
        
        m.reply(`*─── ❲ تـمـت الإزالـة ❳ ───*\n\nتـم حـذف الـمـلـف وتـطـهـيـر الـمـسـار بـنـجـاح\n╰╼ الـهـدف : [ ${target} ]\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣︎ ───*`);
    }
};

handler.category = 'owner';
handler.command = ['اضافه_ملف', 'حذف_ملف'];
handler.owner = true;

export default handler;
