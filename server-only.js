import { spawn } from 'child_process';

// Ejecutar el servidor
console.log('Iniciando servidor Express...');
const server = spawn('node', ['--import', 'tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
});

// Manejar la terminación del proceso
process.on('SIGINT', () => {
  server.kill();
  process.exit();
});

console.log('Servidor iniciado. Presiona Ctrl+C para detener.');