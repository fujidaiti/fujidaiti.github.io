import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://fujidaiti.github.io',
  integrations: [
    expressiveCode({
      themes: ['light-plus'],
      styleOverrides: {
        borderRadius: '0rem',
        codeFontSize: '0.9rem',
        frames: {
          shadowColor: 'transparent',
        },
      },
    }),
  ],
})
