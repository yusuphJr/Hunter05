const axios = require('axios');

exports.run = async (msg, args) => {
    const query = args.join(' ');
    if (!query) return msg.reply('Please enter keywords.');

    try {
        const apiKey = process.env.UNSPLASH_ACCESS_KEY;
        const res = await axios.get(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${apiKey}`);
        const image = res.data.urls.regular;

        msg.reply('*Image result:*');
        client.sendMessage(msg.from, image, { caption: `Search: ${query}` });
    } catch (e) {
        msg.reply('Image fetch failed.');
    }
};
