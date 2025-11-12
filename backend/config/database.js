import mongoose from 'mongoose';

/**
 * Configuración y conexión a MongoDB
 * Aplica mejores prácticas de seguridad y manejo de errores
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Opciones recomendadas para MongoDB
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
    
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
    // Salir de la aplicación si no se puede conectar
    process.exit(1);
  }
};

// Manejar eventos de conexión
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB desconectado');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ Error de MongoDB: ${err.message}`);
});

export default connectDB;

