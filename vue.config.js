module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/F301.APP/src/App.vue/' : '/',
  pwa: {
    name: 'appvuejs',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#000000',
      display: 'standalone',
      scope: '/',
      start_url: '/'
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
}
