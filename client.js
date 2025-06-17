const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    const prefix = '!';
    if (!msg.body.startsWith(prefix)) return;

    const args = msg.body.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        const handler = require(`./commands/${command}.js`);
        handler.run(msg, args, client);
    } catch (err) {
        msg.reply('Command not recognized.');
    }
});

module.exports = client;
