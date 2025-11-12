import mongoose from 'mongoose';

/**
 * Modelo de Noticia para el sistema AlertaClimática
 */
const noticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es requerido'],
    trim: true
  },
  categoria: {
    type: String,
    enum: ['alert', 'forecast', 'report', 'all'],
    default: 'all',
    required: true
  },
  ciudad: {
    type: String,
    default: 'General',
    trim: true
  },
  temperatura: {
    type: String,
    default: '--°C'
  },
  condicion: {
    type: String,
    default: '--'
  },
  gravedad: {
    type: String,
    enum: ['baja', 'media', 'alta', 'crítica'],
    default: 'media'
  },
  imagen: {
    type: String,
    default: ''
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publicada: {
    type: Boolean,
    default: true
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice para búsquedas más rápidas
noticiaSchema.index({ titulo: 'text', contenido: 'text' });
noticiaSchema.index({ categoria: 1, fechaPublicacion: -1 });

const Noticia = mongoose.model('Noticia', noticiaSchema);

export default Noticia;

