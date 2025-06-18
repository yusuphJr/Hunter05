const axios = require('axios');

exports.run = async (msg, args) => {
    const city = args.join(' ');
    if (!city) return msg.reply('Please enter a city name.');

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

        const res = await axios.get(url);
        const data = res.data;

        msg.reply(`🌤 *Weather in ${data.location.name}*\nTemp: ${data.current.temp_c}°C\nCondition: ${data.current.condition.text}`);
    } catch (err) {
        msg.reply('Failed to fetch weather info.');
    }
};
