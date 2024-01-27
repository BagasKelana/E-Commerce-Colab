import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: `${process.env.VITE_API_USER}`,
                    secure: true,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                '/admin': {
                    target: `${process.env.VITE_API_ADMIN}`,
                    secure: true,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/admin/, '')
                }
            }
        }
    });
};
