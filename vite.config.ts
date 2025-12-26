import { defineConfig } from '@opencloud-eu/extension-sdk'

export default defineConfig({
  name: 'local-llm-opencloud',
  server: {
    port: 9224
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js'
      }
    }
  }
})
