/**
 * Módulo de Autenticación
 * Maneja todas las operaciones relacionadas con autenticación y seguridad
 */

const Auth = {
  /**
   * Guardar token en localStorage
   */
  guardarToken(token) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, token);
      return true;
    } catch (error) {
      console.error('Error al guardar token:', error);
      return false;
    }
  },

  /**
   * Obtener token de localStorage
   */
  obtenerToken() {
    try {
      return localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error al obtener token:', error);
      return null;
    }
  },

  /**
   * Eliminar token de localStorage
   */
  eliminarToken() {
    try {
      localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
      localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
      return true;
    } catch (error) {
      console.error('Error al eliminar token:', error);
      return false;
    }
  },

  /**
   * Guardar datos del usuario
   */
  guardarUsuario(usuario) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(usuario));
      return true;
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      return false;
    }
  },

  /**
   * Obtener datos del usuario
   */
  obtenerUsuario() {
    try {
      const user = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  },

  /**
   * Verificar si el usuario está autenticado
   */
  estaAutenticado() {
    return !!this.obtenerToken();
  },

  /**
   * Login de usuario
   */
  async login(email, password) {
    try {
      const response = await fetch(`${CONFIG.API_URL}${CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Guardar token y usuario
      this.guardarToken(data.data.token);
      this.guardarUsuario(data.data.usuario);

      return { success: true, data: data.data };

    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Logout de usuario
   */
  logout() {
    this.eliminarToken();
    window.location.href = 'login.html';
  },

  /**
   * Verificar token con el servidor
   */
  async verificarToken() {
    try {
      const token = this.obtenerToken();
      
      if (!token) {
        return { success: false, error: 'No hay token' };
      }

      const response = await fetch(`${CONFIG.API_URL}${CONFIG.ENDPOINTS.AUTH.VERIFICAR}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Token inválido');
      }

      return { success: true, data: data.data };

    } catch (error) {
      console.error('Error al verificar token:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener headers con autenticación para peticiones
   */
  obtenerHeaders() {
    const token = this.obtenerToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  },

  /**
   * Proteger página - redirigir si no está autenticado
   */
  async protegerPagina() {
    if (!this.estaAutenticado()) {
      window.location.href = 'login.html';
      return false;
    }

    // Verificar que el token sea válido
    const resultado = await this.verificarToken();
    
    if (!resultado.success) {
      this.eliminarToken();
      window.location.href = 'login.html';
      return false;
    }

    return true;
  }
};

// Exportar para uso global
window.Auth = Auth;

