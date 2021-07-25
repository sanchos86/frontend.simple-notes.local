const appConfig = require('./config/config');

module.exports = {
  lintOnSave: false,
  devServer: {
    progress: false,
    proxy: {
      '/api': {
        target: appConfig.proxy,
      },
    },
  },
  chainWebpack(config) {
    config
      .plugin('html')
      .tap((args) => {
        /* eslint-disable no-param-reassign */
        args[0].appConfig = JSON.stringify(appConfig);
        args[0].title = appConfig.title;
        /* eslint-enable no-param-reassign */
        return args;
      });
  },
};
