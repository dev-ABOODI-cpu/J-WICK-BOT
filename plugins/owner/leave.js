const handler = async (m, { conn, text }) => {
  m.reply("*اسف حا اخرج عشان مطوري اشوفكم مرة تانية ⁦🕷*")
  conn.groupLeave(m.chat)
};

handler.usage = ["اخرج"];
handler.category = "group";
handler.command = ["اخرج"];
handler.owner = true 
export default handler;