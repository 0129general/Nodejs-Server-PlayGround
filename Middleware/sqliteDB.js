const sqlite3 = require('sqlite3');
const { open } = require('sqlite');





// open the database file
const connectTosqliteDB = async () => {

    // const sqliteDB = await open({
    //     filename: 'socketMissedOrders.db',
    //     driver: sqlite3.Database
    // });


    // const dbPath = path.resolve(__dirname, 'socketMissedOrders.db');
    const sqliteDB = new sqlite3.Database('socketMissedOrders.db', (err) => {
        if (err) {
            console.error('❌ Error opening database:', err.message);
        } else {
            console.log('✅ SQLite DB connected at', 'socketMissedOrders.db');
        }
    });

    console.log('---sqliteDB', sqliteDB)


    await sqliteDB.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_offset TEXT UNIQUE,
            content TEXT
        );
      `);



    return sqliteDB
}



module.exports = connectTosqliteDB;