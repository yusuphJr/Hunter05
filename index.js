const SESSION_PATH = '/data/session.json';
const { Client, LocalAuth } = require('whatsapp-web.js');
const { handleReply } = require('./handlers/replyHandler');
const { sendMenu } = require('./menu');
const { sendCommandToPython } = require('./ipc');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

client.on('qr', qr => require('qrcode-terminal').generate(qr, { small: true }));
client.on('ready', () => console.log('🤖 Anonymous Bot is Ready'));

client.on('message', async msg => {
  const text = msg.body.toLowerCase();
  const chat = await msg.getChat();

  if (text === "menu") {
    sendMenu(client, msg.from);
    return;
  }

  if (text.startsWith("gpt ") || text.startsWith("say ") || text.startsWith("search ") || text.startsWith("img ") || text.startsWith("mp3 ") || text.startsWith("mp4 ") || text.startsWith("weather ") || text.startsWith("news ") || text.startsWith("ball ")) {
    const result = await sendCommandToPython(text); // IPC
    client.sendMessage(msg.from, result);
    return;
  }

  handleReply(client, msg); // handles reply actions like “1”, “2” from menu
});

client.initialize();