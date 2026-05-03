const handler = async (m, { conn, command }) => {
const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
const jids = participants.map(p => p.id);

if (jids.length < 2) {
    return conn.sendMessage(m.chat, { text: "المجموعة صغيرة جداً" });
}

let randomIndex = Math.floor(Math.random() * jids.length);
const randomUser = jids[randomIndex];
const percentage = Math.floor(Math.random() * 100) + 1;

let responseText = "";

switch (command) {
    case "بحبني":
        responseText = `*❤️ اكتر واحد بيحبك يا جميل ❤️*\n\n*المستخدم [ @${randomUser.split('@')[0]} ]* \n\n> *نسبة حبه ليك: ${percentage}%* 💕`;
        break;
        
    case "بكرهني":
        responseText = `*😡 اكتر واحد بيكرهك 😡*\n\n*المستخدم [ @${randomUser.split('@')[0]} ]* \n\n> *نسبة كرهه ليك: ${percentage}%* 🌚`;
        break;
        
    case "مكرش":
        responseText = `*💘 اكتشفت مين معجب فيك 💘*\n\n*المستخدم [ @${randomUser.split('@')[0]} ] \n\n> نسبة اعجابه بيك: *${percentage}%* 😍`;
        break;
        
    default:
        return;
}

return conn.sendMessage(m.chat, { 
    text: responseText, 
    mentions: [randomUser] 
}, { quoted: m });
};

handler.usage = ["بحبني", "بكرهني", "مكرش"];
handler.category = "group";
handler.command = ["بحبني", "بكرهني", "مكرش"];

export default handler;