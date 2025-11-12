/**
 * Configuración global de la aplicación
 * Centraliza las URLs y constantes del sistema
 */

const CONFIG = {
  // URL de la API (cambia esto según tu entorno)
  API_URL: 'http://localhost:5000/api',
  
  // Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTRO: '/auth/registro',
      PERFIL: '/auth/perfil',
      VERIFICAR: '/auth/verificar'
    },
    NOTICIAS: {
      BASE: '/noticias',
      STATS: '/noticias/stats/general'
    }
  },

  // Almacenamiento local
  STORAGE_KEYS: {
    TOKEN: 'alertaclimatica_token',
    USER: 'alertaclimatica_user'
  },

  // Configuración de la app
  APP: {
    NAME: 'AlertaClimática',
    VERSION: '1.0.0'
  }
};

// Exportar para uso global
window.CONFIG = CONFIG;

