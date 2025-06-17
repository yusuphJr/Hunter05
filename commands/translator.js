const translate = require('@vitalets/google-translate-api');

exports.run = async (msg, args) => {
    const lang = args.shift(); // e.g., "sw" for Swahili
    const text = args.join(' ');

    if (!lang || !text) return msg.reply('Format: !translator <lang_code> <text>');

    try {
        const res = await translate(text, { to: lang });
        msg.reply(`*Translated (${lang}):* ${res.text}`);
    } catch (err) {
        msg.reply('Translation failed: ' + err.message);
    }
};
