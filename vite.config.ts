import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: { port: 8081, cors: false },
});

// store-builder.com
// export default defineConfig({
//   plugins: [react(), basicSsl()],

//   server: { port: 5172, cors: false },
// });
