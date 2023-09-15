import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'node14',
  dts: {
    resolve: true,
  },
  clean: true,
  sourcemap: true,
  external: [
    'react',
    '@chakra-ui/anatomy',
    '@chakra-ui/react',
    '@chakra-ui/system',
    '@chakra-ui/utils',
    '@chakra-ui/react-utils',
    '@chakra-ui/theme-tools',
    '@saas-ui/react-utils',
  ],
  format: ['esm', 'cjs'],
  banner: {
    js: "'use client'",
  },
})
