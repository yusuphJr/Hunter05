exports.setupRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Anonymous Bot is alive!');
    });
};
