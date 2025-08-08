import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import compression from 'compression';
import cors from 'cors';
import serveStatic from 'serve-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

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
app.use((err, req, res, _next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`
🚀 CiberNiños Server Started!
📍 Running on: http://${HOST}:${PORT}
🌐 Environment: ${process.env.NODE_ENV || 'production'}
📱 Mobile Access: http://[your-ip]:${PORT}
⚡ Ready for cybersecurity education!
`);
});

export default app;
