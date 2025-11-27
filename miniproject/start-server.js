#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = spawn('npx', ['json-server', '--watch', 'db.json', '--port', '3000'], {
  cwd: __dirname,
  stdio: 'inherit'
});

server.on('error', (err) => {
  console.error('Failed to start JSON Server:', err);
  process.exit(1);
});

console.log('JSON Server starting on port 3000...');
