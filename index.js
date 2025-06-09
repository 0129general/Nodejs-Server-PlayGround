const { app, server, express } = require("./Server/server");
const config = require("./env-config.js");
// const bodyParser = require('body-parser');
// const busboy = require('connect-busboy');
// const { RedisClient, scanKeysByPattern } = require("./Middleware/redis");
const missedOrders = require("./missedOrders.js"); // 🟢 Shared order buffer
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const chalk = require("chalk");
const connected = chalk.bold.yellowBright;
const colorProcessId = chalk.hex("#FF893A");
const socketIoColor = chalk.hex("#FF893A");
const warningColor = chalk.hex("#FF6138");
const connectionPing = chalk.hex("#acfa70");
const logger = require("./Middleware/logger");
const error = chalk.bold.redBright;

// const db = require('./Middleware/db');
// const db2 = require('./Middleware/db2')
const { io } = require("./SocketIo/socketIo");

// const errorHandler = require("./Middleware/error");
const Routes = require("./routes"); // All api URLS NEW file structure

const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
// const connectTosqliteDB = require('./Middleware/sqliteDB.js')

app.use(cors()); // cors is for cross origin resources for issue with front end backend ports
app.use(mongoSanitize()); // Sanitize data
app.use(helmet()); // Security headers

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      // console.error(err);
      logger.error(
        `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      return res.sendStatus(400); // Bad request
    }
    logger.info(
      `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    next();
  });
});

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(compression()); // // asset compression for zipping files
app.use(express.json());

app.set("trust proxy", 1);

// Before going live capture disconnect event and capture in newrelic or monitoring tool,so you know when cient go down
const clients = new Map();
io.on("connection", async (socket) => {
  const clientType = socket.handshake.query.type;
  const clientTypeName = socket.handshake.query.KitchenName;
  const allowedFrontEndClients = [
    "customer_frontend_app",
    "kitchen_frontend_app",
    "driver_frontend_app",
  ];

  if (allowedFrontEndClients.includes(clientType)) {
    if (clientType === "kitchen_frontend_app") {
      socket.join("kitchen_room");
    } else if (clientType === "customer_frontend_app") {
      socket.join("customer_room");
    } else if (clientType === "driver_frontend_app") {
      socket.join("driver_room");
    }

    console.log(
      socketIoColor(
        `Client connected: ${clientTypeName} ${socket.id} [${clientType}]`
      )
    );

    if (clientType) {
      clients.set(`${clientType}_${clientTypeName}`, socket.id);
    }

    // Client sending ping message to check connection ,server will reply pong
    socket.on("ping", async () => {
      console.log(
        connectionPing(
          `Received ping from client [${clientType}_${clientTypeName}],`
        )
      );
      socket.emit(`pong`); // Reply to ping
    });

    // Before going live capture disconnect event and capture in newrelic or monitoring tool,so you know when cient go down
    socket.on("disconnect", () => {
      clients.forEach((id, key) => {
        if (id === socket.id) {
          clients.delete(key);
          console.log(
            warningColor(
              `Client disconnected: ${socket.id} [${key}] [${clientType}_${clientTypeName}]`
            )
          );
        }
      });
    });
  } else {
    // Before going live capture disconnect event and capture in newrelic or monitoring tool,so you know when cient go down
    console.log(`Client type not allowed: ${clientType}`);
    socket.disconnect();
  }
});

app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  req.clients = clients;
  return next();
}); // We are getting socket IO as middleware in ( meal order , payasyougo order ,order update)

app.use("/", Routes); // New Path for route
// app.use(errorHandler); // Error Handler DB2 Connected

server.listen(process.env.PORT || process.env.PORT_NUMBER, () => {
  console.log(
    chalk.yellowBright(`
    ENV file : ${process.env.ENV_FILE_SERVERD}
    APP NAME : ${process.env.APP_NAME}
    App listening on PORT : ${process.env.PORT || process.env.PORT_NUMBER}
    HOST : ${process.env.HOST}
    Redis url 😀 : ${
      process.env.NODE_ENV === "production"
        ? process.env.HOSTED_REDIS_URL
        : process.env.REDIS_URL
    }
    `)
  );

  // logger.info(`Server started and running on http://${process.env.HOST}:${config.PORT}
  // `)
});

// const closeConnections = async (msg) => {
//   try {
//     if (db.readyState === 1) {
//       // 1 means connected
//       console.log("First Mongo DB is active");
//       await db.getClient().close();
//       console.log(
//         error(`First Mongo DB disconnected through app termination (${msg})`)
//       );
//     } else {
//       console.log("First Mongo DB is already disconnected.");
//     }

//     if (db.readyState === 1) {
//       // 1 means connected
//       console.log("Second Mongo DB is active");
//       await db2.getClient().close();
//       console.log(
//         error(`Second Mongo DB disconnected through app termination (${msg})`)
//       );
//     } else {
//       console.log("Second Mongo DB is already disconnected.");
//     }
//   } catch (e) {
//     console.log("error >> ", e);
//     process.exit(1);
//   }
// };

// process.on("SIGINT", async () => {
//   console.log("SIGINT received");
//   await closeConnections("SIGINT");
//   // Close the HTTP server gracefully
//   server.close(() => {
//     console.log("HTTP server closed.");
//     process.exit(0); // Exit after server is closed
//   });
// });

// process.on("SIGTERM", async () => {
//   console.log("SIGTERM received");
//   await closeConnections("SIGTERM");
// });

module.exports = app;
