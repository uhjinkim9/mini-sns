import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5000,
		proxy: {
			"/api": {
				target: process.env.VITE_GATEWAY_URL || "http://localhost:5001",
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
	},
});
