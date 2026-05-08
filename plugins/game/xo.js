async function handler(m, { command, text, conn }) {

  global.xoGames ??= {};
  const game = global.xoGames[m.chat];

  const cmd =
    (text || "").trim().toLowerCase().split(' ')[0];

  const isDelete =
    cmd === 'delete' || cmd === 'حذف';

  const isJoin =
    cmd === 'join' || cmd === 'انضمام';

  if (isDelete) {

    if (!game)
      return m.reply("❌ لا توجد لعبة نشطة!");

    if (game.player1 !== m.sender &&
        game.player2 !== m.sender)
      return m.reply("❌ فقط اللاعبين يمكنهم الحذف!");

    delete global.xoGames[m.chat];

    return m.reply("🗑️ تم حذف اللعبة!");

  }

  if (!command || isJoin) {

    if (!game)
      return m.reply("❌ لا توجد لعبة! اكتب *.xo*");

    if (game.status === 'playing')
      return m.reply("❌ اللعبة بدأت بالفعل!");

    if (game.player1 === m.sender)
      return m.reply("❌ لا يمكنك اللعب ضد نفسك!");

    game.player2 = m.sender;
    game.status = 'playing';

    return conn.sendMessage(m.chat, {

      text:
`🎮 بدأت اللعبة!

${drawBoard(game.board)}

@${game.player1.split('@')[0]} (❌)
vs
@${game.player2.split('@')[0]} (⭕)

دور ❌ يبدأ أولاً`,

      mentions: [game.player1, game.player2]

    });

  }

  if (game) {

    return m.reply(
      game.status === 'waiting'
        ? `❌ @${game.player1.split('@')[0]} ينتظر خصم`
        : "❌ لعبة شغالة بالفعل",
      null,
      { mentions: [game.player1] }
    );

  }

  global.xoGames[m.chat] = {
    player1: m.sender,
    player2: null,
    board: Array(9).fill(null),
    turn: 'X',
    status: 'waiting'
  };

  return m.reply(
`🎮 تم إنشاء لعبة XO

@${m.sender.split('@')[0]} ينتظر خصم

اكتب *.xo* للانضمام!`,
  null,
  { mentions: [m.sender] });

}

handler.before = async (m, { conn }) => {

  if (!m.text) return false;

  const game =
    global.xoGames?.[m.chat];

  if (!game ||
      game.status !== 'playing')
    return false;

  const currentPlayer =
    game.turn === 'X'
      ? game.player1
      : game.player2;

  if (!currentPlayer) return false;

  if (m.sender !== currentPlayer)
    return false;

  const move =
    parseInt(m.text.trim()) - 1;

  if (isNaN(move) ||
      move < 0 ||
      move > 8)
    return false;

  if (game.board[move] !== null)
    return m.reply("❌ هذا المربع مشغول!");

  game.board[move] = game.turn;

  const winner = checkWinner(game.board);

  if (winner || game.board.every(c => c)) {

    let text;
    let winnerJid;

    if (winner) {

      winnerJid =
        winner === 'X'
          ? game.player1
          : game.player2;

      text =
`${drawBoard(game.board)}

🎉 @${winnerJid.split('@')[0]} فاز!`;

      if (global.db?.users?.[winnerJid]) {

        global.db.users[winnerJid].xp =
          (global.db.users[winnerJid].xp || 0) + 500;

        global.db.users[winnerJid].cookies =
          (global.db.users[winnerJid].cookies || 0) + 10;

        text += `\n\n🏆 +500 XP | 🍪 +10`;

      }

    } else {

      text =
`${drawBoard(game.board)}

🤝 تعادل!`;

    }

    await conn.sendMessage(m.chat, {
      text,
      mentions: winnerJid ? [winnerJid] : []
    });

    delete global.xoGames[m.chat];
    return true;

  }

  game.turn =
    game.turn === 'X' ? 'O' : 'X';

  const nextPlayer =
    game.turn === 'X'
      ? game.player1
      : game.player2;

  if (!nextPlayer) return false;

  await conn.sendMessage(m.chat, {

    text:
`${drawBoard(game.board)}

@${nextPlayer.split('@')[0]} دورك (${game.turn})`,

    mentions: [nextPlayer]

  });

  return true;

};

export default handler;
