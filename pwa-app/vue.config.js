module.exports = {
  // other configurations...
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Your New App Name';
      return args;
    });
  },
  pwa: {
    name: 'Resturant Management System', // <---- this is PWA name
  }
};