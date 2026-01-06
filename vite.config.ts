import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    define: {
      // ⚠️ WARNING: This exposes your API Key to the public browser.
      // Anyone can see this key in the "Network" tab or source code.
      // Ensure you have set usage limits in your Google Cloud Console.
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // Correct alias for your flat file structure
        "@": path.resolve(__dirname, "."),
      },
    },
    // ✅ ADD THIS SECTION FOR VERCEL
    build: {
      outDir: "dist",
      sourcemap: false, // Disables source maps for production (cleaner code)
    },
  };
});
