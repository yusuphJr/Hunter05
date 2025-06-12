const net = require('net');
const sendCommandToPython = (command) => {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.connect(9090, '127.0.0.1', () => {
      client.write(command);
    });

    client.on('data', (data) => {
      resolve(data.toString());
      client.destroy();
    });

    client.on('error', reject);
  });
};

module.exports = { sendCommandToPython };
