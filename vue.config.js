const appConfig = require('./config/config');

module.exports = {
  lintOnSave: false,

  devServer: {
    progress: false,
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

  transpileDependencies: [
    'vuetify',
  ],

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/scss/variables/_variables.scss";',
      },
    },
  },
};
