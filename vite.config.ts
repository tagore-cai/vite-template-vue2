import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import { viteMockServe } from 'vite-plugin-mock';
import { createVuePlugin } from 'vite-plugin-vue2';
import { createSvgPlugin } from 'vite-plugin-vue2-svg';
import { vitePluginCommonjs } from 'vite-plugin-commonjs';
import { injectHtml, minifyHtml } from 'vite-plugin-html';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

import Components from 'unplugin-vue-components/vite';
import { ElementUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: 'public',
  base: './',
  mode: 'development',
  optimizeDeps: {
    // 要预构建的第三方依赖
    include: [],
  },
  resolve: { alias: { '@': '/src' } },
  server: { port: 3001, cors: true },
  define: { 'process.env': process.env },
  plugins: [
    createVuePlugin({ jsx: true }),
    vitePluginCommonjs(),
    { ...WindiCSS(), apply: 'build' },
    { ...minifyHtml(), apply: 'build' },
    injectHtml({
      injectData: {
        htmlWebpackPlugin: { options: { isVite: true } },
        title: 'test',
      },
    }),
    Components({
      dts: false,
      resolvers: [ElementUiResolver({ importStyle: true }), IconsResolver({ componentPrefix: '' })],
    }),
    Icons(),
    viteMockServe({ mockPath: 'mock' }),
    createSvgPlugin({}),
  ],
});
