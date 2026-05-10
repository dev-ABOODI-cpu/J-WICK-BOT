/* 
by: VA ~ ABOODI 
*/

const example = async (m, { conn }) => {

conn.msgUrl(m.chat,
  '*🔥 Special Offer*',
  {
    img: 'https://i.postimg.cc/50RZLD2X/21317022ddf5862432a39318f314e445.jpg',
    title: '50% OFF',
    body: 'Limited time',
    big: true,
    mentions: ['249113388050@s.whatsapp.net', '249112727808@s.whatsapp.net'],
    newsletter: {
      name: '𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥',
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
