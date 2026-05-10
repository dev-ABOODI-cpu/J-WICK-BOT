/* ─── ❲ نـظـام الـتـنـصـيـب : 𝐑𝐔𝐒𝐓𝐀𝐌 ❳ ─── */

const run = async (m, { args, conn, bot }) => {
  if (global.db.noSub) return m.reply("── ❲ تـنـبـيـه ❳ ──\n\n| عـذراً: نـظـام الـتـنـصـيـب مـغـلـق حـالـيـاً بـواسـطـة الـمـطـور")
  
  try {
    const num = m.sender.split("@")[0].replace(/[+\s-]/g, '');
    if (!/^\d+$/.test(num)) return m.reply("── ❲ خـطأ ❳ ──\n\n| رقـم الـهـاتـف غـيـر صـالـح");

    const sub = global.subBots;
    if (!sub) return m.reply("── ❲ خـطأ ❳ ──\n\n| نـظـام الـبـوتـات الـفـرعـيـة غـيـر مـتـاح");

    const init = await m.reply(`── ❲ جـاري الـتـنـصـيـب ❳ ──\n\n| يـتـم الـآن تـجـهـيـز الـكـود لـلـرقـم : [ ${num} ]\n| يُـرجـى الـإنـتـظـار قـلـيـلاً...`);

    const state = { uid: null, pairDone: false, resolved: false, pending: null };
    const { images: img } = bot.config.info;

    const cleanup = () => {
      sub.off('pair', handlers.pair);
      sub.off('ready', handlers.ready);
      sub.off('error', handlers.error);
    };

    const handlers = {
      pair: (id, code) => {
        if (state.pairDone) return;
        if (!state.uid) { state.pending = { id, code }; return; }
        if (id !== state.uid) return;
        state.pairDone = true;
        Func.pair(conn, code, num, m, init);
      },
      ready: (id) => {
        if (id !== state.uid || state.resolved) return;
        state.resolved = true;
        Func.ready(conn, num, m, img[Math.floor(Math.random() * img.length)]);
        cleanup();
      },
      error: (id, err) => {
        if (id !== state.uid || state.resolved) return;
        state.resolved = true;
        Func.error(conn, num, err, m);
        cleanup();
      },
    };

    sub.on('pair', handlers.pair);
    sub.on('ready', handlers.ready);
    sub.on('error', handlers.error);

    state.uid = await sub.add(num);

    if (state.pending?.id === state.uid && !state.pairDone) {
      state.pairDone = true;
      Func.pair(conn, state.pending.code, num, m, init);
    }

    setTimeout(() => {
      if (state.resolved) return;
      state.resolved = true;
      Func.timeout(conn, m, state.pairDone);
      cleanup();
    }, 120000);

  } catch (error) {
    await m.reply(error.message);
  }
};

run.command = ["تنصيب"];
run.category = "sub";
export default run;

const Func = {
  pair: async (conn, code, num, m, reply_status) => {
    await conn.sendButton(m.chat, {
      imageUrl: "https://i.postimg.cc/GpyBWT4D/dc653b9a82c4f3d277922290b3a43119.jpg",
      bodyText: `─── ❲ نـظـام الـبـوتـات الـفـرعـيـة ❳ ───\n\n| الـرقم : [ ${num} ]\n| الـكـود : [ ${code} ]\n\n─── ❲ طـريـقـة الـربـط ❳ ───\n\n| الـإعـدادات > الـأجـهـزة الـمـرتـبـطـة\n| ربـط جـهـاز > ربـط بـرقـم الـهـاتـف\n| ثـم أدخـل الـكـود الـمـرسـل أعـلـاه`,
      footerText: "𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣",
      buttons: [
        { name: "cta_copy", params: { display_text: "نسـخ الـكـود", copy_code: code } }
      ],
      mentions: [m.sender],
      newsletter: {
        name: '𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣',
        jid: '120363425546384005@newsletter'
      }
    }, global.reply_status);
  },

  ready: async (conn, num, m, img) => {
    await m.react("✅");
    await conn.sendMessage(m.chat, {
      text: `─── ❲ نـجـاح الـإتـصـال ❳ ───\n\n| تـم ربـط الـبـوت بـنـجـاح\n| الـرقـم : [ ${num} ]\n| الـحـالـة : نـشـط الـآن\n\n─── 𝐈𝐍 ⁝|⁝ 𝐑𝐔𝐒𝐓𝐀𝐌 ☣ ───`,
    });
  },

  error: async (conn, num, err, m) => {
    await m.reply(`─── ❲ فـشـل الـإقـتـران ❳ ───\n\n| الـرقـم : [ ${num} ]\n| الـخـطأ : [ ${err?.message || 'غير معروف'} ]`);
  },

  timeout: async (conn, m, pairDone) => {
    await m.reply(pairDone
      ? `── ❲ إنـتـهـاء الـوقـت ❳ ──\n\n| تـم إرسـال الـكـود ولـم يـتـم الـتـأكـيـد\n| يُـرجـى الـمـحـاولـة مـرة أخـرى`
      : `── ❲ إنـتـهـاء الـوقـت ❳ ──\n\n| لـم يـتـم إسـتـلـام كـود الـإقـتـران\n| تـأكـد مـن صـحـة الـرقـم`
    );
  }
};
