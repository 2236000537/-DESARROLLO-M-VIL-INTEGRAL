import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter para prevenir ataques de fuerza bruta en login
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos por ventana
  message: {
    success: false,
    error: 'Demasiados intentos de inicio de sesión. Por favor intenta de nuevo en 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate Limiter general para la API
 */
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests por ventana
  message: {
    success: false,
    error: 'Demasiadas solicitudes desde esta IP. Por favor intenta más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Middleware para sanitizar entradas y prevenir inyección NoSQL
 */
export const sanitizarEntradas = (req, res, next) => {
  // Remover caracteres potencialmente peligrosos
  const sanitizar = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizar(obj[key]);
      } else if (typeof obj[key] === 'string') {
        // Prevenir inyección NoSQL removiendo operadores de MongoDB
        obj[key] = obj[key].replace(/[${}]/g, '');
      }
    }
  };

  if (req.body) sanitizar(req.body);
  if (req.query) sanitizar(req.query);
  if (req.params) sanitizar(req.params);

  next();
};

