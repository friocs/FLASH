import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// 引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

import { 
  ElementPlusResolver,
  VantResolver
} from 'unplugin-vue-components/resolvers'
// @ts-ignore
import {resolve} from 'path'
const pathResolve = (pathStr) => {
  return resolve(__dirname, pathStr)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //按需要引入插件（自动导入） AutoImport Components
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        VantResolver()
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        VantResolver()
      ],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的svg图标文件夹，即需要识别的svg都应该放在这个文件夹下
      iconDirs: [pathResolve('./src/assets/svg')],
      // iconDirs: [pathResolve('src/assets/svgs')],
      // 指定symbolId格式（这里的配置与6.2步骤中的引入svg组件的name配置项写法有关）
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  base: "/",
  resolve:{
    alias:{
      "@": "/src",
      "vue-i18n":'vue-i18n/dist/vue-i18n.cjs.js',
    }
  },
  build:{
      sourcemap:'inline',
      minify:'terser',
  },
  server:{
    //hmr: { overlay: false },
    https: false, // 是否开启 https
    open: false, // 是否自动在浏览器打开
    port: 3000, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        // target: "https://superswap.cool/", // 后台接口
        // target: "https://api.superswap.cool/", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      '/upload': {
        target: `http://api.crystal.td.ink/`,
        ws: true, //是否代理websockets11
        changeOrigin: true,
        rewrite:(path) => path.replace(/^\/upload/, "/upload"),
      }
    },
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: [],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        // NodeGlobalsPolyfillPlugin({
        //   process: true,
        //   buffer: true,
        // }),
      ],
    },
  },
  define: {
    'process.env': {},
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
        additionalData: '@import "./src/assets/css/vant.scss";@import "./src/assets/font/font.scss";',
      },
    },
  },
})
