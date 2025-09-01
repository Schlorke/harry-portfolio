import { defineConfig } from "vite";
import purgecss from "vite-plugin-purgecss";

export default defineConfig({
  root: "src", // Seu index.html está na pasta src
  publicDir: "../public", // Pasta pública na raiz do projeto
  base: "", // Para Netlify, use barra ou remova essa linha (padrão já é "/")
  server: {
    host: true, // Permite acesso pela rede local (ex: via Safari no iPhone)
    port: 5173, // Porta padrão (pode ser alterada se estiver ocupada)
  },
  build: {
    outDir: "../dist", // Saída na raiz
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      input: {
        main: 'src/index.html'
      }
    }
  },
  plugins: [
    purgecss({
      content: ["./src/**/*.{html,js}"],
    }),
  ],
});
