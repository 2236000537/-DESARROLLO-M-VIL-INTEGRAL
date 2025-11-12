import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Generar JWT Token
 */
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

/**
 * @desc    Registrar nuevo usuario (admin)
 * @route   POST /api/auth/registro
 * @access  Public (en producción debería ser privado solo para admins)
 */
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExiste = await User.findOne({ email });

    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        error: 'El email ya está registrado'
      });
    }

    // Crear nuevo usuario
    const usuario = await User.create({
      nombre,
      email,
      password,
      rol: rol || 'editor'
    });

    // Generar token
    const token = generarToken(usuario._id);

    res.status(201).json({
      success: true,
      mensaje: 'Usuario registrado exitosamente',
      data: {
        token,
        usuario: usuario.obtenerDatosPublicos()
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al registrar usuario',
      detalles: error.message
    });
  }
};

/**
 * @desc    Login de usuario
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email (incluir password esta vez)
    const usuario = await User.findOne({ email }).select('+password');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        error: 'Usuario inactivo. Contacta al administrador.'
      });
    }

    // Verificar contraseña
    const passwordCorrecta = await usuario.compararPassword(password);

    if (!passwordCorrecta) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Actualizar último acceso
    usuario.ultimoAcceso = Date.now();
    await usuario.save();

    // Generar token
    const token = generarToken(usuario._id);

    res.status(200).json({
      success: true,
      mensaje: 'Login exitoso',
      data: {
        token,
        usuario: usuario.obtenerDatosPublicos()
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      error: 'Error al iniciar sesión',
      detalles: error.message
    });
  }
};

/**
 * @desc    Obtener usuario actual
 * @route   GET /api/auth/perfil
 * @access  Private
 */
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);

    res.status(200).json({
      success: true,
      data: usuario.obtenerDatosPublicos()
    });

  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener perfil'
    });
  }
};

/**
 * @desc    Verificar token
 * @route   GET /api/auth/verificar
 * @access  Private
 */
export const verificarToken = async (req, res) => {
  res.status(200).json({
    success: true,
    mensaje: 'Token válido',
    data: {
      usuario: req.usuario.obtenerDatosPublicos()
    }
  });
};

