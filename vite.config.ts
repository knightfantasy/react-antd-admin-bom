import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import viteCompression from 'vite-plugin-compression'
import cdn from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '#': resolve(__dirname, 'types'),
    },
  },
  plugins: [
    react(),
    UnoCSS(),
    AutoImport({
      imports: [
        'react',
        'react-router-dom',
        'react-i18next',
      ],
      dts: 'types/auto-imports.d.ts',
    }),
    viteCompression({
      threshold: 1024 * 10,
    }),
    cdn({
      modules: [
        'react',
        'react-dom',
        'dayjs',
        'antd',
        'axios',
      ],
    }),
  ],
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      external: ['react', 'react-dom', 'dayjs', 'antd', 'axios'],
      output: {
        format: 'umd',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'antd': 'antd',
        },
      },
    },
  },
})
