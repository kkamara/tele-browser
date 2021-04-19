const { appConfig } = require("./config");
const { 
    validate, 
    get, 
    save, 
    getAll,
    del,
    update,
    exists,
} = require("./models/item");
const slugify = require('slugify');

const cookieParser = require("cookie-parser");
const sanitize = require('sanitize');
const express = require("express");
const app = express();

const path = require('path');

/** serving react with static path */
const buildPath = path.join(__dirname, 'frontend', 'build');
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
if (appConfig.appDebug === true) {
    /** Better stack traces for server errors */
    app.use((req, res, next) => {
        const render = res.render;
        const send = res.send;
        res.render = function renderWrapper(...args) {
            Error.captureStackTrace(this);
            return render.apply(this, args);
        };
        res.send = function sendWrapper(...args) {
            try {
                send.apply(this, args);
            } catch (err) {
                console.error(`Error in res.send | ${err.code} | ${err.message} | ${res.stack}`);
            }
        };
        next();
    });
}

/** serving api routes */
router = express.Router();

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
    
    const item = get(name_slug);
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

    const updateItem = await update({
        name: req.body.name,
        name_slug: slugify(req.body.name),
    }, req.params.slug);
    
    if (true !== updateItem) {
        res.statusCode = 500;
        return res.send(JSON.stringify({
            error: updateItem.message,
            message: 'Unsuccessful',
        }));
    }

    const updatedItem = get(name_slug);
    return res.send(JSON.stringify(updatedItem));
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
    const port = "3000";
    app.listen(port, () => {
        if (false === appConfig.testing) {
            const open = require('open');
            open(url);
        }
        const url = `${appConfig.appURL}:${appConfig.appPort}`;
        console.log(`Listening on ${url}`);
    });
}
