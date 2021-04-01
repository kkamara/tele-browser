const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const openDb = async () => {
    const db = await open({
        filename: path.join(process.cwd(),'telebrowser.db'),
        driver: sqlite3.cached.Database
    }).catch(err => console.log(err));

    await db.migrate()
        .catch(err => console.log(err));
    
    return db;
};

module.exports = {
    openDb
};
