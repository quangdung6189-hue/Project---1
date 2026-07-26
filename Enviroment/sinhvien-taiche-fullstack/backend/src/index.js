import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';

config();

import { env } from './config/index.js';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import logger from './utils/logger.js';

const app = express();

// ============================================
// Security Middleware
// ============================================
app.use(helmet({
  contentSecurityPolicy: env.nodeEnv === 'production' ? undefined : false,
  crossOriginEmbedderPolicy: false,
}));

// ============================================
// CORS Configuration
// ============================================
app.use(cors({
  origin: env.corsOrigin.split(',').map(o => o.trim()),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ============================================
// Body Parsing
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// Request Logging
// ============================================
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// ============================================
// Rate Limiting
// ============================================
app.use('/api', apiLimiter);

// ============================================
// API Routes
// ============================================
app.use('/api', routes);

// ============================================
// Error Handling
// ============================================
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// Start Server
// ============================================
const server = app.listen(env.port, () => {
  logger.info(`
  ╔══════════════════════════════════════════════╗
  ║   🚀 SV Tái Chế API Server                  ║
  ║   📡 Port: ${env.port.toString().padEnd(35)}║
  ║   🌍 Environment: ${env.nodeEnv.padEnd(31)}║
  ║   🔗 http://localhost:${env.port}/api/health ║
  ╚══════════════════════════════════════════════╝
  `);
});

// ============================================
// Graceful Shutdown
// ============================================
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

export default app;

