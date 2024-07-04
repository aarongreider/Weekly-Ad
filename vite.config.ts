import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://aaron.greider.org/Weekly-Ad/dist/',
  plugins: [react()],
  build: {
    output: {
      hash: false,
    },
  },
})
