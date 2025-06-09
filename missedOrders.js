// missedOrders.js
const missedOrders = [];
const SSE_clients = {}; // Store connections per storeId

module.exports = { missedOrders, SSE_clients }