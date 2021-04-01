const { openDb } = require("../db");
const slugify = require('slugify');

/** 
 * @const {function} validate
 * @param {string} item
 */
const validate = async item => {
    const db = await openDb();
    const errors = [];

    if (!item.name) {
        errors.push('The name field is required.');
    } else if (typeof item.name !== 'string') {
        errors.push('The name field must be of type string.');
    } else if (item.name.length < 3) {
        errors.push('The name field length must be at least 3 characters.');
    } else if (item.name.length >= 20) {
        errors.push('The name field length must be less than 20 characters.');
    } else {
        try {
            const exists = await db.get(
                'SELECT * FROM items WHERE name_slug = ?',
                slugify(item.name)
            );

            if (exists) {
                errors.push('The name field already exists.');
            }
        } catch (err) {}
    }

    return errors;
}

/** 
 * @const {function} get
 * @param {string} name_slug
 */
const get = async name_slug => {
    const db = await openDb();
    return await db.get('SELECT * FROM items WHERE name_slug = ? LIMIT 1', name_slug);
};

/** 
 * @const {function} save
 * @param {object} item
 */
const save = async item => {
    const db = await openDb();
    const { name, name_slug } = item;
    try {
        await db.run(
            'INSERT INTO items (name, name_slug) VALUES (?, ?)',
            name,
            name_slug
        );
        return item;
    } catch (err) { 
        console.log(err);
        return false; 
    }
};

/** @const {function} getAll */
const getAll = async () => {
    const db = await openDb();
    return await db.all('SELECT * FROM items;');
};

/** 
 * @const {function} del
 * @param {string} name_slug
 */
 const del = async name_slug => {
    const db = await openDb();
    return await db.run('DELETE FROM items WHERE name_slug = ?;', name_slug);
};

/** 
 * @const {function} update
 * @param {object} item
 * @param {str} original_name_slug
 */
const update = async (item, original_name_slug) => {
    const db = await openDb();
    try {
        await db.run(
            'UPDATE items SET name = ?, name_slug = ? WHERE name_slug = ?',
            item.name,
            item.name_slug,
            original_name_slug
        );
        return item;
    } catch (err) { 
        console.log(err);
        return false; 
    }
};

module.exports = {
    validate,
    get,
    save,
    getAll,
    del,
    update,
};
