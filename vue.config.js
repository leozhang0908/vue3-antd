const path = require('path');
const { defineConfig } = require('@vue/cli-service')
const resolve = (dir) => path.join(__dirname, dir); // 路径
const createProxy = () => {
  let proxy = {};
  eval(process.env.VUE_APP_PROXY).forEach(v => {
    proxy[[v[0]]] = {
      target: v[1],
      changeOrigin: true
    }
  })
  return { proxy };
}

module.exports = defineConfig({
  lintOnSave: false, //关闭eslint检查
  // publicPath: isDev ? '' : querystring.unescape('<%=request.getContextPath()%>'),
  publicPath: '/',
  productionSourceMap: false,
  devServer: createProxy(),
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {},
        },
        additionalData: `
          @import "ant-design-vue/lib/style/themes/default.less";
          @import "~@/styles/variables.less";`,
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
    // use defineOptions https://github.com/sxzz/unplugin-vue-define-options
    config.plugins.push(require('unplugin-vue-define-options/webpack')());
  }
})
