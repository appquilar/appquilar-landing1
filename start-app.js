import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ejecutar el cliente con Vite
function startClient() {
  console.log('Iniciando cliente Vite...');
  return spawn('npx', ['vite'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });
}

// Ejecutar el servidor
function startServer() {
  console.log('Iniciando servidor Express...');
  return spawn('node', ['--import', 'tsx', 'server/index.ts'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });
}

// Iniciar ambos procesos
const clientProcess = startClient();
const serverProcess = startServer();

// Manejar la terminación de los procesos
process.on('SIGINT', () => {
  clientProcess.kill();
  serverProcess.kill();
  process.exit();
});

console.log('Aplicación iniciada. Presiona Ctrl+C para detener.');