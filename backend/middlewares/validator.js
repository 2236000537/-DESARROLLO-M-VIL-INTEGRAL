import { body, validationResult } from 'express-validator';

/**
 * Middleware para manejar errores de validación
 */
export const manejarErroresValidacion = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errores: errors.array().map(error => ({
        campo: error.path,
        mensaje: error.msg
      }))
    });
  }
  
  next();
};

/**
 * Validaciones para registro de usuario
 */
export const validarRegistro = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .escape(),
  
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
    .matches(/[a-zA-Z]/).withMessage('La contraseña debe contener al menos una letra'),
  
  manejarErroresValidacion
];

/**
 * Validaciones para login
 */
export const validarLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('La contraseña es requerida'),
  
  manejarErroresValidacion
];

/**
 * Validaciones para crear/actualizar noticia
 */
export const validarNoticia = [
  body('titulo')
    .trim()
    .notEmpty().withMessage('El título es requerido')
    .isLength({ min: 5, max: 200 }).withMessage('El título debe tener entre 5 y 200 caracteres')
    .escape(),
  
  body('contenido')
    .trim()
    .notEmpty().withMessage('El contenido es requerido')
    .isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
  
  body('categoria')
    .optional()
    .isIn(['alert', 'forecast', 'report', 'all']).withMessage('Categoría inválida'),
  
  body('ciudad')
    .optional()
    .trim()
    .escape(),
  
  body('gravedad')
    .optional()
    .isIn(['baja', 'media', 'alta', 'crítica']).withMessage('Gravedad inválida'),
  
  manejarErroresValidacion
];

