const path = require('path');
const { defineConfig } = require('@vue/cli-service')
const resolve = (dir) => path.join(__dirname, dir); // 路径

module.exports = defineConfig({
  lintOnSave: false, //关闭eslint检查
  // publicPath: isDev ? '' : querystring.unescape('<%=request.getContextPath()%>'),
  publicPath: '/',
  productionSourceMap: false,
  // transpileDependencies: true,
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {},
        },
        additionalData: `
          @import "ant-design-vue/lib/style/themes/default.less";
          @import "~@/styles/variables.less";
      `,
      },
    }
  },
  chainWebpack: config => {
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // svg rule loader
    // svg rule loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'ion-icon-[name]',
      });
  },
  configureWebpack: (config) => {
    // 开启顶级await
    config.experiments = {
      topLevelAwait: true,
    };
    // config.resolve.fallback = { path: require.resolve('path-browserify') };
    // use defineOptions https://github.com/sxzz/unplugin-vue-define-options
    config.plugins.push(require('unplugin-vue-define-options/webpack')());
  }
})
