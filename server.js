import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import compression from 'compression';
import cors from 'cors';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    app: 'CiberNiños',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Server info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'CiberNiños - Cybersecurity Education',
    description: 'Interactive cybersecurity learning platform for kids',
    features: [
      'Password strength checker',
      'Phishing detection games',
      'Safe browsing tips',
      'Interactive cyber heroes'
    ],
    tech: 'React + Vite + Express',
    mobile_friendly: true
  });
});

// Fallback to serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((err, _req, res, _next) => {
  console.error('🚨 Server Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🔄 Received SIGINT, shutting down gracefully');
  process.exit(0);
});

// Start server
app.listen(PORT, HOST, () => {
  const serverUrl = `http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`;
  
  console.log(`
🚀 CiberNiños Server Started Successfully!
📍 Server URL: ${serverUrl}
🌐 Environment: ${process.env.NODE_ENV || 'production'}
📱 Mobile Access: http://[your-device-ip]:${PORT}
🛡️  Cybersecurity education ready!
⚡ Press Ctrl+C to stop the server
`);

  // Display network interfaces for mobile access
  try {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    console.log('📱 Mobile Access URLs:');
    
    Object.keys(interfaces).forEach(ifname => {
      interfaces[ifname].forEach(iface => {
        if (iface.family === 'IPv4' && !iface.internal) {
          console.log(`   📍 http://${iface.address}:${PORT}`);
        }
      });
    });
  } catch {
    // Ignore if we can't get network info
  }
  
  console.log('\n');
});

export default app;