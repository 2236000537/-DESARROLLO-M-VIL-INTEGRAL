import express from 'express';
import {
  obtenerNoticias,
  obtenerNoticiaPorId,
  crearNoticia,
  actualizarNoticia,
  eliminarNoticia,
  obtenerEstadisticas
} from '../controllers/noticiaController.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.js';
import { validarNoticia } from '../middlewares/validator.js';

const router = express.Router();

/**
 * Rutas públicas
 */
router.get('/', obtenerNoticias);
router.get('/:id', obtenerNoticiaPorId);

/**
 * Rutas protegidas (requieren autenticación)
 */
router.post('/', protegerRuta, validarNoticia, crearNoticia);
router.put('/:id', protegerRuta, validarNoticia, actualizarNoticia);
router.delete('/:id', protegerRuta, autorizarRoles('admin'), eliminarNoticia);

/**
 * Estadísticas (solo para usuarios autenticados)
 */
router.get('/stats/general', protegerRuta, obtenerEstadisticas);

export default router;

