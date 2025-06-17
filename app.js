const client = require('./client');
const { setupRoutes } = require('./routes');
const express = require('express');
const app = express();

app.use(express.json());
setupRoutes(app);

client.initialize();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Anonymous bot server running on port ${PORT}`);
});
