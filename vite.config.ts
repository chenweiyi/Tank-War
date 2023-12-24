import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { CodeInspectorPlugin } from 'code-inspector-plugin'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    Components({
      dts: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [ElementPlusResolver()],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, //.ts,.tsx,.js,.jsx
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: [
        'vue',
        'vue-router',
        {
          from: 'vue-router',
          imports: [
            'RouteLocationRaw',
            'RouteLocationNormalized',
            'RouteRecordRaw',
            'RouteRecordName',
          ],
          type: true,
        },
        {
          'lodash-es': ['cloneDeep', 'isNil', 'isEmpty', 'isString', 'isNumber', 'isArray'],
        },
      ],
      resolvers: [ElementPlusResolver()],
    }),
    CodeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
})
