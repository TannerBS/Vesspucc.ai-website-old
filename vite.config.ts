import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/Vespucc.ai-Website/", // Assuming your repository name is Vespucci.ai-Website
  plugins: [react()],
})
