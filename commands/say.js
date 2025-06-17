const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

exports.run = async (msg, args, client) => {
    const text = args.join(' ');
    if (!text) return msg.reply('You must provide text to speak.');

    const gtts = new gTTS(text, 'en');
    const filePath = path.join(__dirname, '../media/voice.mp3');

    gtts.save(filePath, function (err) {
        if (err) {
            console.error(err);
            return msg.reply('Error generating audio.');
        }
        msg.reply('Here is the audio:', msg.from);
        client.sendMessage(msg.from, fs.readFileSync(filePath), { sendAudioAsVoice: true });
    });
};
