const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const openDb = async () => {
    const db = await open({
        filename: path.join(process.cwd(),'telebrowser.db'),
        driver: sqlite3.cached.Database
    });
    await db.migrate({ force: true, });
    return db;
};

module.exports = {
    openDb
};
