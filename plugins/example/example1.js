/* 
by: VA ~ VENOM
*/

const example = async (m, { conn }) => {

conn.msgUrl(m.chat,
  '*🔥 Special Offer*',
  {
    img: 'https://i.postimg.cc/RV5Ypq7S/2d38929b4e6d0fe34b002805729dd9ba.jpg',
    title: '50% OFF',
    body: 'Limited time',
    big: true,
    mentions: ['249113388050@s.whatsapp.net', '249112727808@s.whatsapp.net'],
    newsletter: {
      name: '𝗝 𝗪𝗶𝗰𝗸 ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 🕷️',
      jid: '120363425546384005@newsletter'
    }
  },
  m
)

};

example.usage = ["تست1"]


/* ↓ قسم الأمر ↓ */
example.category = "example"


/* ↓ استخدم الأوامر ↓ */
example.command = ["تست1"] 


/* ↓ بتعمل ايقاف ل الأمر ↓ */
example.disabled = false // لو عملتها true الأمر كده مش هيشتغل

/* ↓ استخدام الأمر بعد ثانيه من الاستخدام لمنع الاسبام ↓ */
example.cooldown = 1000; // تقدر تزود الثواني 


/* ↓ استخدام الأمر ب بدايه أو لا ↓ */
example.usePrefix = false; // لو عملتها true الأمر هيبقي من غير بدايه 

export default example;