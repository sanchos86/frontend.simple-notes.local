const defaultConfig = require('./default');

const env = process.env.NODE_ENV;
const path = `./${env}.js`;

let envConfig;

try {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  envConfig = require(path);
} catch (e) {
  envConfig = {};
}

envConfig.env = env;

module.exports = Object.assign(defaultConfig, envConfig);
