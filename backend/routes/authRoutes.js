import express from 'express';
import {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  verificarToken
} from '../controllers/authController.js';
import { protegerRuta } from '../middlewares/auth.js';
import { validarRegistro, validarLogin } from '../middlewares/validator.js';
import { loginLimiter } from '../middlewares/security.js';

const router = express.Router();

/**
 * Rutas de autenticación
 */

// Registro de usuario (en producción, proteger esta ruta)
router.post('/registro', validarRegistro, registrarUsuario);

// Login con rate limiting
router.post('/login', loginLimiter, validarLogin, loginUsuario);

// Obtener perfil del usuario autenticado
router.get('/perfil', protegerRuta, obtenerPerfil);

// Verificar si el token es válido
router.get('/verificar', protegerRuta, verificarToken);

export default router;

