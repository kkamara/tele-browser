import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const openDb = async () => {
    const db = await open({
        filename: path.join(process.cwd(),'telebrowser.db'),
        driver: sqlite3.cached.Database
    }).catch(err => console.log(err));

    await db.migrate()
        .catch(err => console.log(err));

    return db;
};

export default openDb;
