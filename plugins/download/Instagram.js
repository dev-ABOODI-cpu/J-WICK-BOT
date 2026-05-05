const insta = async (m, { text, Api, conn }) => {
  if (!text) return m.reply("❌: ضع الرابط جنب الامر");

  try {
    // تم نقل استدعاء الـ API داخل الـ try-catch للتعامل مع أي خطأ في الاتصال
    const response = await Api.download.instagram({ url: text });
    const { status, data } = response;

    if (status !== 'success') {
      if (m.react) await m.react("❌");
      return m.reply("❌ حدث خطأ أثناء جلب البيانات، أو أن الرابط غير صالح.");
    }

    if (Array.isArray(data) && data.length > 0) {
      let thumbnail = null;
      let video = null;

      for (let item of data) {
        if (item.type === "thumbnail" || item.type === "image") {
          thumbnail = item.url;
        } else if (item.type === "video") {
          video = item.url;
        }
      }

      if (thumbnail) {
        await conn.sendMessage(m.chat, { 
          image: { url: thumbnail },
          caption: "```Instagram preview image```"
        }, { quoted: m });
      }

      if (video) {
        await conn.sendMessage(m.chat, { 
          video: { url: video }, 
          caption: "```📥 Instagram video downloaded successfully```"
        }, { quoted: m });
      } else {
        return m.reply("❌ لم يتم العثور على فيديو في هذا المنشور.");
      }
    } else {
      return m.reply("❌ لم يتم العثور على بيانات لهذا الرابط.");
    }
    
  } catch (error) {
    console.error("Instagram Error:", error.message);
    return m.reply(`❌ حدث خطأ أثناء التحميل: ${error.message}`);
  }
};

insta.usage = ["انستا"];
insta.category = "downloads";
insta.command = ["انستا", "instagram", "ig"];
insta.admin = false;

export default insta;
