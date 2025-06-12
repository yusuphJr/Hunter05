const sendMenu = async (client, to) => {
  const menu = `
🧠 *ANONYMOUS BOT MENU*

Reply with a number to choose:

1. :AI
2. :WEB Search
3. :Media
4. :ToolKIT
5. :Mature

Type *menu* anytime to return here.
`;
  await client.sendMessage(to, menu);
};

module.exports = { sendMenu };
