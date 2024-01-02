import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'node18',
  dts: {
    resolve: true,
  },
  clean: true,
  minify: true,
  sourcemap: true,
  external: ['react'],
  format: ['esm', 'cjs'],
  banner: {
    js: "'use client'",
  },
})
