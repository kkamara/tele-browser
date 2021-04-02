const { appConfig } = require("./config");
const { 
    validate, 
    get, 
    save, 
    getAll,
    del,
    update
} = require("./models/item");
const slugify = require('slugify');

const cookieParser = require("cookie-parser");
const sanitize = require('sanitize');
const express = require("express");
var cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(sanitize.middleware);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-Type", "application/json");
    next();
});
if (appConfig.appDebug === true) {
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

// routes
router = express.Router();

router.post('/items', async (req, res) => {
    const errors = await validate(req.body);
    if (errors.length) {
        res.statusCode = 401;
        return res.send(JSON.stringify({
            errors,
            message: 'Unsuccessful',
        }));
    }

    const name_slug = slugify(req.body.name);
    const item = await save({
        name_slug,
        name: req.body.name,
    });

    if (item === false) {
        res.statusCode = 500;
        res.send(JSON.stringify({
            error: 'Error encountered when saving resource.'
        }));
    }

    return res.send(JSON.stringify(item));
});

router.get('/items', async (req, res) => {
    const data = await getAll();
    return res.send(JSON.stringify(data));
});

router.patch('/items/:slug', async (req, res) => {
    const item = await get(req.params.slug);
    if (!item) {
        res.statusCode = 401;
        return res.send(JSON.stringify({
            error: 'Resource not found.',
            message: 'Unsuccessful',
        }));
    }

    const errors = await validate(req.body);
    if (errors.length) {
        res.statusCode = 401;
        return res.send(JSON.stringify({
            errors,
            message: 'Unsuccessful',
        }));
    }

    const newItem = await update({
        name: req.body.name,
        name_slug: slugify(req.body.name),
    }, req.params.slug);

    return res.send(JSON.stringify(newItem));
});

router.delete('/items/:slug', async (req, res) => {
    const item = await get(req.params.slug);
    if (!item) {
        res.statusCode = 401;
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
    app.listen(80);
} else {
    const port = "3000";
    app.listen(port, () => {
        const url = `http://127.0.0.1:${port}`;
        console.log(`Listening on ${url}`);
    });
}
