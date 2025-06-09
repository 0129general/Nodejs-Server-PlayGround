const moment = require("moment");
const { validationResult } = require("express-validator");
// const { RedisClient, scanKeysByPattern } = require("../Middleware/redis");
// const connectTosqliteDB = require("../Middleware/sqliteDB");

// Real time order update to customer using socket io
async function NotifyUsers(req, res, next) {
  try {
    const { data, whomToNotify } = req.body;
    // whomToNotify = [ 'kitchen']
    // console.log('----data 1', data)
    // console.log('---- whomToNotify 1', whomToNotify)

    try {
      if (whomToNotify === "kitchen") {
        const kitchenSocketId = req.clients.get(
          `kitchen_frontend_app_${data?.kitchen_name}`
        );
        const kitchenSocket = req.io.sockets.sockets.get(kitchenSocketId);
        // const kitchenSocket = req.io.to('kitchen_room').emit(data?.kitchen_name, data);
        const kitchenSockets = await req.io.in("kitchen_room").fetchSockets();
        console.log(`👥 Sockets in kitchen_room: ${kitchenSockets.length}`);
        // console.log(kitchenSocket, kitchenSockets);

        if (kitchenSocket && kitchenSocket.connected) {
          // const Respo = kitchenSocket.emit(data?.kitchen_name, data)
          req.io.to("kitchen_room").emit(data?.kitchen_name, data);
          console.log(`📦 Order sent: ${data.kitchen_name}`);
        } else {
          console.log("⚠️ Kitchen socket is not connected");

          // Storing Missied order in Redis
          // await RedisClient.set(
          //     `kitchen_frontend_app_${data?.kitchen_name}_${data?.order_no}`,
          //     JSON.stringify(data)
          // );
        }
      }
    } catch (e) {
      // to see if we need to return anything here
      console.log("----Error in NotifyUsers", e);
      return res.status(200).json({
        success: false,
        CustomMessage: "NotifyUsers - Notification server ERROR",
        ERROR: e.message,
      });
    }
    res.status(200).json({
      success: true,
      CustomMessage: "NotifyUsers - Notification server",
    });
    next();
  } catch (error) {
    const Api_Name = "NotifyUsers-API - Notification server";
    req.action = Api_Name;
    next(error, req, res);
  }
}

exports.NotifyUsers = NotifyUsers;
