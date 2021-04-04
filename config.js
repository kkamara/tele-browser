const parseEnvFile = require("dotenv").config();

if (parseEnvFile.error) {
    throw parseEnvFile.error;
}

const appConfig = {
    asset: path => {
        if (path[0] === "/") return `${path}`;
        return `/${path}`;
    },
    appName: process.env.APP_NAME,
    nodeEnv: process.env.NODE_ENV,
    appDebug: process.env.APP_DEBUG,
    appURL: process.env.APP_URL,
    appPort: process.env.APP_PORT,
    appLocale: process.env.APP_LOCALE,
    testing: process.env.TESTING,
};

module.exports = { appConfig };
