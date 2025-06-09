const mongoose = require('mongoose');
const chalk = require('chalk');

const connected = chalk.bold.cyan;
const connected1 = chalk.bold.greenBright;
const error = chalk.bold.redBright;
const disconnected = chalk.bold.red;




// Mongoose connection options for production
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds if server selection fails
    maxPoolSize: 100,  // Maintain 100 active connections
    socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
    family: 4,               // Use IPv4, skip trying IPv6
    authSource: "admin",     // Set auth source for Atlas or self-hosted replica sets
    // useFindAndModify: false, // Avoid deprecation warnings
    // useCreateIndex: true,    // Ensure indexes are created
    //   user: process.env.MONGO_USER, 
    //   pass: process.env.MONGO_PASSWORD,
};

const db = mongoose.createConnection(process.env.DatabaseIkram, mongooseOptions);

db.on('connected', () => {
    console.log(connected(`Connected to  ${process.env.DATABASE_NAME}  Database 1`));
});

db.on('error', (err) => {
    console.error(error(`Mongo DB connection error 1: ${process.env.DATABASE_NAME}`));
});

db.on('disconnected', () => {
    console.log(error(`Mongo DB disconnected : ${process.env.DATABASE_NAME}`));
});

module.exports = db;
