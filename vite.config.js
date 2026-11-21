import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { LEETCODE_QUERY } from './api/leetcode.js'

const leetcodeProxy = {
  '/api/leetcode': {
    target: 'https://leetcode.com',
    changeOrigin: true,
    rewrite: () => `/graphql?query=${encodeURIComponent(LEETCODE_QUERY)}`,
    headers: { Referer: 'https://leetcode.com' },
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: leetcodeProxy },
  preview: { proxy: leetcodeProxy },
})
