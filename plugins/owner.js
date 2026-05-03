let handler = async (m, { conn, bot }) => {
  let watermark = '𝐃𝐄𝐕 𝐀𝐁𝐎𝐎𝐃𝐈';
  
  let quoted = {
    key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
    message: { conversation: '𝗜𝗡 - 𝗝 𝗪𝗶𝗰𝗸 🕷' }
  };
  const num = bot.config.owners[0].jid.split("@")[0];
  let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${watermark}
TEL;type=CELL;waid=${num}:+${num}
END:VCARD`;

  let img = 'https://i.postimg.cc/pT130Z2L/7455a701cd927bf5b1391450b0257c3f.jpg';
  
  await conn.sendMessage(m.chat, {
    contacts: { displayName: watermark, contacts: [{ vcard }] },
    contextInfo: {
      forwardingScore: 2023,
      externalAdReply: {
        title: '𝑇𝛨𝛯 𝛩𝑊𝛮𝛯𝑅',
        body: watermark,
        sourceUrl: 'https://whatsapp.com/channel/0029VbD0h4pBPzjZ3hTsPP02',
        thumbnailUrl: img,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted })
};

handler.command = /^(owner|مطور|المطور)$/i;

export default handler;