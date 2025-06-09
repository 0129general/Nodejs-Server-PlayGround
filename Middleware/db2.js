const mongoose = require('mongoose');
const chalk = require('chalk');

const connected = chalk.bold.cyan;
const connected1 = chalk.bold.greenBright;
const error = chalk.bold.redBright;
const disconnected = chalk.bold.red;

// console.log('---process.env', process.env.DatabaseIkram_SECOND)

// const connection = mongoose.createConnection(`${process.env.DatabaseIkram_SECOND}`, {
//     useNewUrlParser: true, useUnifiedTopology: true,
//     useCreateIndex: true, useFindAndModify: false
// });

// connection.once('connected', () => {
//     console.log(connected(`Connected to  ${process.env.DATABASE_SECOND}`))

// });

// connection.on('disconnected', () => {
//     console.log(disconnected('Mongoose DatabaseIkram_SECOND connection is disconnected'))
// });

// mongoose.connection.on('error', () => console.log(error('Database connection error', error)));



// // process.on('unhandledRejection', function(err ,promise){
// //     mongoose.connection.close(function(){
// //         console.log(termination(`Mongoose default connection is disconnected due to application termination = ${err.message}`));
// //          process.exit(1)
// //          //process.exit(0)
// //     });
// //   })


// module.exports = connection




// Construct MongoDB URI from environment variables
const mongoURI = process.env.DatabaseIkram_SECOND || 'mongodb://localhost:27017/mydatabase';

// Mongoose connection options for production
const mongooseOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false, // Avoid deprecation warnings
    // useCreateIndex: true,    // Ensure indexes are created
    // poolSize: 10,            // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds if server selection fails
    socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
    family: 4,               // Use IPv4, skip trying IPv6
    authSource: "admin",     // Set auth source for Atlas or self-hosted replica sets
    //   user: process.env.MONGO_USER, 
    //   pass: process.env.MONGO_PASSWORD,
};

const db2 = mongoose.createConnection(mongoURI, mongooseOptions);

db2.on('connected', () => {
    console.log(connected(`Connected to ${process.env.DATABASE_SECOND}  Second Database`));
});

db2.on('error', (err) => {
    console.error(error(`Second Mongo DB connection error 1: ${process.env.DATABASE_SECOND}`));
});

db2.on('disconnected', () => {
    console.log(error(`Second Mongo DB disconnected : ${process.env.DATABASE_SECOND}`));
});

module.exports = db2;