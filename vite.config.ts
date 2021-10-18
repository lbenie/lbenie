import { defineConfig } from 'vite'
import postcssLit from 'rollup-plugin-postcss-lit'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/entry.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
  server: {
    open: true,
  },
  // @ts-expect-error: "normal"
  plugins: [{ ...postcssLit(), enforce: 'post' }],
})
