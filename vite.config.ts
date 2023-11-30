import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { CodeInspectorPlugin } from 'code-inspector-plugin'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

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
    }),
    AutoImport({
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
          'lodash-es': [
            'cloneDeep',
            'isNil',
            'isEmpty',
            'isString',
            'isNumber',
            'isArray',
          ],
        },
      ],
    }),
    CodeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
})
