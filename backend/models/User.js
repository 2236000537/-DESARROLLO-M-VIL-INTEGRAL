import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Modelo de Usuario para autenticación
 * Incluye validaciones y encriptación de contraseña
 */
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor ingresa un email válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false // No devolver la contraseña en las consultas por defecto
  },
  rol: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor'
  },
  activo: {
    type: Boolean,
    default: true
  },
  ultimoAcceso: {
    type: Date
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Middleware para encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  // Solo encriptar si la contraseña fue modificada
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generar salt y hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.compararPassword = async function(passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

// Método para obtener datos públicos del usuario
userSchema.methods.obtenerDatosPublicos = function() {
  return {
    id: this._id,
    nombre: this.nombre,
    email: this.email,
    rol: this.rol,
    activo: this.activo,
    createdAt: this.createdAt
  };
};

const User = mongoose.model('User', userSchema);

export default User;

