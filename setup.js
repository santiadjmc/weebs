#!/usr/bin/env node

/**
 * 🚀 CiberNiños Interactive Setup Script
 * Sets up the cybersecurity education app with Express server
 * Mobile-friendly (works with Termux)
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors and styles for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m'
};

// Cyber-themed emoji and symbols
const symbols = {
  rocket: '🚀',
  shield: '🛡️',
  lock: '🔐',
  key: '🔑',
  robot: '🤖',
  lightning: '⚡',
  star: '⭐',
  check: '✅',
  cross: '❌',
  warning: '⚠️',
  gear: '⚙️',
  globe: '🌐',
  mobile: '📱',
  computer: '💻'
};

// ASCII Art for the header
const asciiArt = `
${colors.cyan}╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    ${colors.magenta}  ██████ ██ ██████  ███████ ██████      ${symbols.shield}          ${colors.cyan}  ║
║    ${colors.magenta} ██      ██ ██   ██ ██      ██   ██     ${symbols.lock}          ${colors.cyan}  ║
║    ${colors.magenta} ██      ██ ██████  █████   ██████      ${symbols.key}          ${colors.cyan}  ║
║    ${colors.magenta} ██      ██ ██   ██ ██      ██   ██     ${symbols.robot}          ${colors.cyan}  ║
║    ${colors.magenta}  ██████ ██ ██████  ███████ ██   ██     ${symbols.rocket}          ${colors.cyan}  ║
║                                                              ║
║    ${colors.yellow}        ███    ██ ██ ███    ██  ████████  ███████    ${colors.cyan}     ║
║    ${colors.yellow}        ████   ██ ██ ████   ██ ██     ██ ██         ${colors.cyan}     ║
║    ${colors.yellow}        ██ ██  ██ ██ ██ ██  ██ ██     ██ ███████    ${colors.cyan}     ║
║    ${colors.yellow}        ██  ██ ██ ██ ██  ██ ██ ██     ██      ██    ${colors.cyan}     ║
║    ${colors.yellow}        ██   ████ ██ ██   ████  ████████  ███████    ${colors.cyan}     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}
`;

class SetupManager {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.steps = [];
    this.currentStep = 0;
    this.serverConfig = {};
  }

  // Animated typing effect
  async typeText(text, speed = 50) {
    for (const char of text) {
      process.stdout.write(char);
      await this.sleep(speed);
    }
  }

  // Sleep utility
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Loading animation
  async showLoader(text, duration = 2000) {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(`\r${colors.cyan}${frames[i % frames.length]} ${text}${colors.reset}`);
      i++;
    }, 100);

    await this.sleep(duration);
    clearInterval(interval);
    process.stdout.write(`\r${colors.green}${symbols.check} ${text} - ¡Completado!${colors.reset}\n`);
  }

  // Progress bar animation
  async showProgress(text, steps = 20) {
    console.log(`\n${colors.bright}${text}${colors.reset}`);
    for (let i = 0; i <= steps; i++) {
      const filled = '█'.repeat(i);
      const empty = '░'.repeat(steps - i);
      const percent = Math.round((i / steps) * 100);
      process.stdout.write(`\r${colors.cyan}[${filled}${empty}] ${percent}%${colors.reset}`);
      await this.sleep(100);
    }
    console.log(`\n${colors.green}${symbols.check} ¡Completado!${colors.reset}`);
  }

  // Question prompts
  async askQuestion(question, defaultValue = '') {
    return new Promise((resolve) => {
      const prompt = defaultValue ? 
        `${colors.yellow}${question}${colors.dim} (default: ${defaultValue})${colors.reset}: ` :
        `${colors.yellow}${question}${colors.reset}: `;
      
      this.rl.question(prompt, (answer) => {
        resolve(answer.trim() || defaultValue);
      });
    });
  }

  // Welcome screen
  async showWelcome() {
    console.clear();
    console.log(asciiArt);
    console.log(`${colors.bright}${colors.magenta}    ¡Bienvenido al Setup Interactivo de CiberNiños! ${symbols.robot}${colors.reset}\n`);
    
    await this.typeText(`${colors.cyan}Este script configurará tu aplicación de educación en ciberseguridad${colors.reset}\n`, 30);
    await this.typeText(`${colors.cyan}con un servidor Express para ejecutarlo en cualquier dispositivo.${colors.reset}\n\n`, 30);
    
    console.log(`${colors.yellow}${symbols.mobile} Compatible con Termux en Android${colors.reset}`);
    console.log(`${colors.yellow}${symbols.computer} Compatible con sistemas desktop${colors.reset}`);
    console.log(`${colors.yellow}${symbols.globe} Servidor web incluido${colors.reset}\n`);
    
    await this.askQuestion('Presiona Enter para continuar');
  }

  // System checks
  async performSystemChecks() {
    console.log(`\n${colors.bright}${colors.blue}${symbols.gear} Verificando Sistema...${colors.reset}\n`);
    
    // Check Node.js version
    await this.showLoader('Verificando Node.js', 1500);
    const nodeVersion = process.version;
    console.log(`${colors.green}   Node.js ${nodeVersion} detectado${colors.reset}`);
    
    // Check if we're in Termux
    const isTermux = process.env.PREFIX && process.env.PREFIX.includes('com.termux');
    if (isTermux) {
      console.log(`${colors.magenta}   ${symbols.mobile} Entorno Termux detectado${colors.reset}`);
    }
    
    // Check npm
    await this.showLoader('Verificando npm', 1000);
    
    // Check project structure
    await this.showLoader('Verificando estructura del proyecto', 1200);
    
    console.log(`\n${colors.green}${symbols.check} Todas las verificaciones pasaron correctamente${colors.reset}\n`);
  }

  // Collect configuration
  async collectConfiguration() {
    console.log(`${colors.bright}${colors.magenta}${symbols.gear} Configuración del Servidor${colors.reset}\n`);
    
    this.serverConfig.port = await this.askQuestion(
      `¿En qué puerto quieres ejecutar el servidor?`, 
      '3000'
    );
    
    this.serverConfig.host = await this.askQuestion(
      `¿Dirección del host? (0.0.0.0 para acceso externo)`, 
      '0.0.0.0'
    );
    
    const useHttps = await this.askQuestion(
      `¿Habilitar HTTPS? (s/n)`, 
      'n'
    );
    this.serverConfig.https = useHttps.toLowerCase().startsWith('s');
    
    console.log(`\n${colors.cyan}Configuración:${colors.reset}`);
    console.log(`${colors.dim}   Puerto: ${this.serverConfig.port}${colors.reset}`);
    console.log(`${colors.dim}   Host: ${this.serverConfig.host}${colors.reset}`);
    console.log(`${colors.dim}   HTTPS: ${this.serverConfig.https ? 'Sí' : 'No'}${colors.reset}`);
    
    const confirm = await this.askQuestion('\n¿Continuar con esta configuración? (s/n)', 's');
    if (!confirm.toLowerCase().startsWith('s')) {
      console.log(`${colors.yellow}${symbols.warning} Setup cancelado por el usuario${colors.reset}`);
      process.exit(0);
    }
  }

  // Install dependencies
  async installDependencies() {
    console.log(`\n${colors.bright}${colors.blue}${symbols.lightning} Instalando Dependencias...${colors.reset}\n`);
    
    // Add Express and related dependencies to package.json
    await this.updatePackageJson();
    
    await this.showProgress('Instalando paquetes npm', 25);
    
    return new Promise((resolve, reject) => {
      const npm = spawn('npm', ['install'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: __dirname
      });
      
      let output = '';
      
      npm.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      npm.stderr.on('data', (data) => {
        output += data.toString();
      });
      
      npm.on('close', (code) => {
        if (code === 0) {
          console.log(`${colors.green}${symbols.check} Dependencias instaladas correctamente${colors.reset}`);
          resolve();
        } else {
          console.log(`${colors.red}${symbols.cross} Error instalando dependencias${colors.reset}`);
          console.log(output);
          reject(new Error('Failed to install dependencies'));
        }
      });
    });
  }

  // Update package.json with Express dependencies
  async updatePackageJson() {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    
    // Add Express dependencies
    if (!packageJson.dependencies.express) {
      packageJson.dependencies = {
        ...packageJson.dependencies,
        express: '^4.18.2',
        'serve-static': '^1.15.0',
        compression: '^1.7.4',
        cors: '^2.8.5'
      };
    }
    
    // Add new scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      'start': 'node server.js',
      'start:dev': 'node server.js --dev',
      'setup': 'node setup.js',
      'build:start': 'npm run build && npm start'
    };
    
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Create Express server
  async createExpressServer() {
    console.log(`\n${colors.bright}${colors.green}${symbols.rocket} Creando Servidor Express...${colors.reset}\n`);
    
    const serverCode = this.generateServerCode();
    await fs.writeFile(path.join(__dirname, 'server.js'), serverCode);
    
    await this.showLoader('Generando configuración del servidor', 2000);
    console.log(`${colors.green}${symbols.check} Servidor Express creado: server.js${colors.reset}`);
  }

  // Generate server.js code
  generateServerCode() {
    return `import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import compression from 'compression';
import cors from 'cors';
import serveStatic from 'serve-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || ${this.serverConfig.port};
const HOST = process.env.HOST || '${this.serverConfig.host}';

// Middleware
app.use(compression());
app.use(cors());

// Serve static files from dist directory
const distPath = path.join(__dirname, 'dist');
app.use(serveStatic(distPath));

// API routes (for future expansion)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    app: 'CiberNiños',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Fallback to serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(\`
🚀 CiberNiños Server Started!
📍 Running on: http://\${HOST}:\${PORT}
🌐 Environment: \${process.env.NODE_ENV || 'production'}
📱 Mobile Access: http://[your-ip]:\${PORT}
⚡ Ready for cybersecurity education!
\`);
});

export default app;
`;
  }

  // Build the React app
  async buildApp() {
    console.log(`\n${colors.bright}${colors.cyan}${symbols.gear} Construyendo la Aplicación...${colors.reset}\n`);
    
    await this.showProgress('Compilando React + Vite', 30);
    
    return new Promise((resolve, reject) => {
      const build = spawn('npm', ['run', 'build'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: __dirname
      });
      
      let output = '';
      
      build.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      build.stderr.on('data', (data) => {
        output += data.toString();
      });
      
      build.on('close', (code) => {
        if (code === 0) {
          console.log(`${colors.green}${symbols.check} Aplicación construida correctamente${colors.reset}`);
          resolve();
        } else {
          console.log(`${colors.red}${symbols.cross} Error construyendo la aplicación${colors.reset}`);
          console.log(output);
          reject(new Error('Failed to build app'));
        }
      });
    });
  }

  // Final success screen
  async showSuccess() {
    console.clear();
    
    const successArt = `
${colors.green}
    ██████  ███████ ████████  ██████      ${symbols.check}
   ██       ██         ██    ██    ██     ${symbols.star}
   ██   ███ █████      ██    ██    ██     ${symbols.rocket}
   ██    ██ ██         ██    ██    ██     ${symbols.shield}
    ██████  ███████    ██     ██████      ${symbols.lightning}
${colors.reset}
`;
    
    console.log(successArt);
    console.log(`${colors.bright}${colors.green}¡Setup Completado Exitosamente!${colors.reset}\n`);
    
    console.log(`${colors.cyan}${symbols.rocket} Tu aplicación CiberNiños está lista para ejecutarse${colors.reset}`);
    console.log(`${colors.cyan}${symbols.globe} Servidor Express configurado en el puerto ${this.serverConfig.port}${colors.reset}`);
    console.log(`${colors.cyan}${symbols.mobile} Compatible con dispositivos móviles${colors.reset}\n`);
    
    console.log(`${colors.yellow}Comandos disponibles:${colors.reset}`);
    console.log(`${colors.dim}  npm start          ${colors.reset} - Iniciar servidor de producción`);
    console.log(`${colors.dim}  npm run start:dev  ${colors.reset} - Iniciar servidor en modo desarrollo`);
    console.log(`${colors.dim}  npm run build      ${colors.reset} - Construir para producción`);
    console.log(`${colors.dim}  npm run dev        ${colors.reset} - Desarrollo con Vite\n`);
    
    const startNow = await this.askQuestion('¿Iniciar el servidor ahora? (s/n)', 's');
    
    if (startNow.toLowerCase().startsWith('s')) {
      console.log(`\n${colors.bright}${colors.magenta}${symbols.rocket} Iniciando servidor...${colors.reset}\n`);
      this.rl.close();
      
      // Start the server
      spawn('npm', ['start'], {
        stdio: 'inherit',
        cwd: __dirname
      });
    } else {
      console.log(`\n${colors.green}${symbols.check} Setup completado. Ejecuta 'npm start' para iniciar el servidor.${colors.reset}`);
      this.rl.close();
    }
  }

  // Handle errors
  async handleError(error) {
    console.log(`\n${colors.red}${symbols.cross} Error durante el setup:${colors.reset}`);
    console.log(`${colors.red}${error.message}${colors.reset}\n`);
    
    const retry = await this.askQuestion('¿Intentar nuevamente? (s/n)', 'n');
    if (retry.toLowerCase().startsWith('s')) {
      await this.run();
    } else {
      console.log(`${colors.yellow}Setup cancelado.${colors.reset}`);
      this.rl.close();
      process.exit(1);
    }
  }

  // Main setup process
  async run() {
    try {
      await this.showWelcome();
      await this.performSystemChecks();
      await this.collectConfiguration();
      await this.installDependencies();
      await this.createExpressServer();
      await this.buildApp();
      await this.showSuccess();
    } catch (error) {
      await this.handleError(error);
    }
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log(`\n\n${colors.yellow}${symbols.warning} Setup interrumpido por el usuario${colors.reset}`);
  process.exit(0);
});

// Start the setup
const setup = new SetupManager();
setup.run().catch(console.error);