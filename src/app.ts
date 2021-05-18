import appConfig from "./config";
import {
    validate,
    get,
    save,
    getAll,
    del,
    update,
    exists,
} from "./models/item";
import slugify from 'slugify';

import cookieParser from "cookie-parser";
import sanitize from 'sanitize';
import express from "express";

const app = express();

import path from 'path';

/** serving react with static path */
const buildPath = path.join(__dirname, '../', 'frontend', 'build');
app.use(express.static(buildPath));

app.use(express.urlencoded({ extended: true }));
app.use(sanitize.middleware);
app.use(express.json());
app.use(cookieParser());
/** handle cors */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", appConfig.appURL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

/** serving api routes */
const router = express.Router();

router.post('/items', async (req, res) => {
    const errors = await validate(req.body);
    if (errors.length) {
        res.statusCode = 400;
        return res.send(JSON.stringify({
            errors,
            message: 'Unsuccessful',
        }));
    }

    const name_slug = slugify(req.body.name);
    const saveItem = await save({
        name_slug,
        name: req.body.name,
    });

    if (true !== saveItem) {
        res.statusCode = 500;
        res.send(JSON.stringify({
            message: 'Unsuccessful',
            error: saveItem.message,
        }));
    }

    const item = await get(name_slug);
    return res.send(JSON.stringify(item));
});

router.get('/items', async (req, res) => {
    const data = await getAll();
    if (data.length === 1) {
        return res.send(JSON.stringify([ ...data ]));
    }
    return res.send(JSON.stringify(data));
});

router.patch('/items/:slug', async (req, res) => {
    const item = await get(req.params.slug);
    if (!item) {
        res.statusCode = 400;
        return res.send(JSON.stringify({
            error: 'Resource not found.',
            message: 'Unsuccessful',
        }));
    }

    const newSlug = slugify(req.body.name);

    if (slugify(item.name_slug) === newSlug) {
        return res.send(JSON.stringify(item));
    }

    const itemExists = await exists(newSlug);
    if (itemExists) {
        res.statusCode = 400;
        return res.send(JSON.stringify({
            error: `Item '${req.body.name}' already exists.`,
            message: 'Unsuccessful',
        }));
    }

    const errors = await validate(req.body);
    if (errors.length) {
        res.statusCode = 400;
        return res.send(JSON.stringify({
            errors,
            message: 'Unsuccessful',
        }));
    }

    const new_slug = slugify(req.body.name);
    const updateItem = await update({
        name: req.body.name,
        name_slug: new_slug,
    }, req.params.slug);

    if (true !== updateItem) {
        res.statusCode = 500;
        return res.send(JSON.stringify({
            error: updateItem.message,
            message: 'Unsuccessful',
        }));
    }

    const newItem = await get(new_slug);
    return res.send(JSON.stringify(newItem));
});

router.delete('/items/:slug', async (req, res) => {
    const item = await get(req.params.slug);
    if (!item) {
        res.statusCode = 400;
        return res.send(JSON.stringify({
            error: 'Resource not found.',
            message: 'Unsuccessful',
        }));
    }
    await del(req.params.slug);
    return res.send(JSON.stringify({ message: 'Success' }));
});

app.use('/api', router);

if (appConfig.nodeEnv === "production") {
    app.listen(appConfig.appPort);
} else {
    app.listen(appConfig.appPort, () => {
        const url = `${appConfig.appURL}:${appConfig.appPort}`;
        if (false === appConfig.testing) {
            const open = require('open');
            open(url);
        }
        console.log(`Listening on ${url}`);
    });
}
