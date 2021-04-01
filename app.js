const { appConfig } = require("./config");
const { openDb } = require("./db");

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
// app.get("/", middleware.csrfProtection, middleware.render("pages/index"));

if (appConfig.nodeEnv === "production") {
    app.listen(80);
} else {
    const port = "3000";
    app.listen(port, () => {
        const url = `http://127.0.0.1:${port}`;
        console.log(`Listening on ${url}`);
    });
}
