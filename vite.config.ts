import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
// https://vitejs.dev/config/
export default (config: Record<string, any>) => {
  process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };
  return defineConfig({
    plugins: [vue(), vuetify()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      target: 'esnext',
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    server: {
      port: 5031
    },
    preview: {
      port: 5032
    }
  });
};
