const { server } = require('../Server/server');
const socketIO = require('socket.io');

const io = socketIO(server, {
    transports: ["websocket"],
    pingInterval: 25000,
    pingTimeout: 60000,
    cors: {
        origin: '*', // Or specify Netlify domain
        methods: ['GET', 'POST', 'PUT']
    },
    connectionStateRecovery: {}
});

module.exports = {
    io,
};



//   const io = socketIO(server, {
//     transports: ['polling'],
//     cors: {
//         origin: '*'
//     }

// });



// // old code delete it later  testing

// cors: {
//     cors: {
//         origin: process.env.CUSTOMER_FRONTEND_DOMAIN_URL
//     }
// }