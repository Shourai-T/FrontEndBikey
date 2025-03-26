import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // Cho phép truy cập từ thiết bị khác
    strictPort: true, // Đảm bảo không bị đổi port
  }
});