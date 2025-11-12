import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import noticiaRoutes from './routes/noticiaRoutes.js';
import { apiLimiter, sanitizarEntradas } from './middlewares/security.js';

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Inicializar Express
const app = express();

/**
 * MIDDLEWARES DE SEGURIDAD
 */

// Helmet - Protección de headers HTTP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS - Configuración de orígenes permitidos
const origenes = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como Postman)
    if (!origin) return callback(null, true);
    
    if (origenes.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logger de requests (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting para toda la API
app.use('/api/', apiLimiter);

// Sanitizar entradas para prevenir inyección NoSQL
app.use(sanitizarEntradas);

/**
 * RUTAS
 */
app.use('/api/auth', authRoutes);
app.use('/api/noticias', noticiaRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    mensaje: '🌦️ API AlertaClimática funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

/**
 * MANEJO DE ERRORES GLOBAL
 */
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

/**
 * INICIAR SERVIDOR
 */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en modo ${process.env.NODE_ENV}`);
  console.log(`📡 Puerto: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`🛡️  Seguridad: HTTPS, Helmet, CORS, Rate Limiting activos\n`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
  });
});

export default app;

