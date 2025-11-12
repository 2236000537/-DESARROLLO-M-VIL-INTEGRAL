import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware de autenticación JWT
 * Verifica que el token sea válido y el usuario exista
 */
export const protegerRuta = async (req, res, next) => {
  let token;

  try {
    // Verificar si existe el token en el header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extraer el token del header
      token = req.headers.authorization.split(' ')[1];
    }

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No autorizado - Token no proporcionado'
      });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar al usuario por ID (sin incluir la contraseña)
    const usuario = await User.findById(decoded.id).select('-password');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        error: 'Usuario inactivo'
      });
    }

    // Agregar el usuario al objeto request
    req.usuario = usuario;
    next();

  } catch (error) {
    console.error('Error en autenticación:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expirado'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Error en el servidor'
    });
  }
};

/**
 * Middleware para verificar roles específicos
 * @param  {...any} roles - Roles permitidos
 */
export const autorizarRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        error: `Rol ${req.usuario.rol} no autorizado para acceder a este recurso`
      });
    }
    next();
  };
};

