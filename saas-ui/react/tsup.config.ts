import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2019',
  dts: {
    resolve: true,
  },
  clean: true,
  sourcemap: true,
  external: [
    'react',
    '@tanstack/react-table',
    '@chakra-ui/react',
    '@chakra-ui/icon',
    '@chakra-ui/system',
    '@chakra-ui/utils',
  ],
  format: ['esm', 'cjs'],
  banner: {
    js: "'use client'",
  },
})
