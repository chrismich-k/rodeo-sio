import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import * as path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
        alias: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
        ],
    },
    server: {
        port: 4173, //3001,
        host: '0.0.0.0',
    },
  };
});
