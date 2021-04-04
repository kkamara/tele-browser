const assert = require('assert');
const slugify = require('slugify');
const axios = require('axios').default;

const { appConfig } = require('../config');

const name = `test name ${Math.round(Math.random() * 100)}`;
const name_slug = slugify(name);

const new_name = `new test name ${Math.round(Math.random() * 100)}`;
const new_name_slug = slugify(new_name);

const apiHost = `${appConfig.appURL}:${appConfig.appPort}`;

describe('testItem', function() { 
    describe('creating item', function() {
        it('api should return new item when saving item', async () => {
            try {
                const res = await axios.post(
                  `${apiHost}/api/items`, 
                  { name }
                );

                assert.notStrictEqual(res.data, { name, name_slug })
            } catch(err) { 
                throw err; 
            }
        });
    });

    describe('reading item', function() {
        it('api should return list of all items', async () => {
            try {
                const res = await axios.get(`${apiHost}/api/items`);

                let exists = false;
                for (const { name_slug: slug } of res.data) {
                    if (name_slug === slug) {
                        exists = true;
                    }
                }

                if (!exists) {
                    assert.fail(`${name_slug} not found in ${JSON.stringify(res.data)}`);
                }
            } catch(err) { 
                throw err; 
            }
        });
    });

    describe('updating item', function() {
        it('api should return new values when updating item', async () => {
            try {
                const res = await axios.patch(
                    `${apiHost}/api/items/${name_slug}`,
                    { 
                        name: new_name,
                    }
                );

                assert.notStrictEqual(res.data, { 
                    name: new_name,
                    name_slug: new_name_slug,
                });
            } catch(err) { 
                throw err; 
            }
        });
    });

    describe('delete item', function() {
        it('api should remove object from db when deleting item', async () => {
            try {
                const res = await axios.delete(`${apiHost}/api/items/${new_name_slug}`);
                assert.notStrictEqual(res.data, { message: 'success' });
            } catch(err) { 
                throw err; 
            }
        });
    });
});
