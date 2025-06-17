const { ChatGPTAPI } = require('chatgpt');
const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });

exports.run = async (msg, args) => {
    const prompt = args.join(' ');
    if (!prompt) return msg.reply('You must enter a prompt.');

    try {
        const res = await api.sendMessage(prompt);
        msg.reply(res.text);
    } catch (e) {
        msg.reply('GPT Error: ' + e.message);
    }
};
