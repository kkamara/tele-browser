const { helpersConfig } = require("./config");

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
// app.get("/", middleware.csrfProtection, middleware.render("pages/index"));

if (helpersConfig.nodeEnv === "production") {
    app.listen(80);
} else {
    const open = require("open");
    const port = "3000";
    app.listen(port, () => {
        const url = `http://127.0.0.1:${port}`;
        console.log(`Listening on ${url}`);
        open(url);
    });
}
