const axios = require('axios');

exports.run = async (msg, args) => {
    const category = args[0] || 'general';
    const apiKey = process.env.NEWS_API_KEY;

    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        const res = await axios.get(url);

        const articles = res.data.articles.slice(0, 5);
        let reply = `🗞 *Top News in ${category}*\n\n`;

        articles.forEach((a, i) => {
            reply += `${i + 1}. *${a.title}*\n${a.url}\n\n`;
        });

        msg.reply(reply);
    } catch (err) {
        msg.reply('Error fetching news.');
    }
};
