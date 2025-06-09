const mongoose = require('mongoose');


// @Category      Kitchen
// @Description   ServerSentEvent to notify frontend user
// @route         /ServerSentEvent
// @method        GET
// @access        Public
// @API-Name      Server Sent Event

// const clients = {}; // storeId => [res, res, ...]

// function registerClient(storeId, res) {

//     console.log('----storeId', storeId)

//     if (!clients[storeId]) clients[storeId] = [];
//     clients[storeId].push(res);

//     res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive'

//     })
//     res.flushHeaders?.();

//     res.on('close', () => {
//         clients[storeId] = clients[storeId].filter(client => client !== res);
//     });
// }

// function sendToClients(storeId, data) {
//     if (!clients[storeId]) return;
//     clients[storeId].forEach(res => {
//         res.write(`data: ${JSON.stringify(data)}\n\n`);
//     });
// }

// module.exports = { registerClient, sendToClients };