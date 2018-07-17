const ENV = {
    DEV: 'dev',
    PRODUCTION: 'production'
};

const ENV_VAL = ENV.DEV;      //dev / production

let DOMAIN = '';

if (ENV_VAL === ENV.DEV) {
    DOMAIN = 'http://localhost:3000';
} else if (ENV_VAL === ENV.PRODUCTION) {
    DOMAIN = 'https://80.idoodle.com.cn'
}

module.exports = {
    DOMAIN: DOMAIN
};