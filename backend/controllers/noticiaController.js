import Noticia from '../models/Noticia.js';

/**
 * @desc    Obtener todas las noticias
 * @route   GET /api/noticias
 * @access  Public
 */
export const obtenerNoticias = async (req, res) => {
  try {
    const { categoria, ciudad, buscar, limit = 50, page = 1 } = req.query;
    
    // Construir filtro
    let filtro = { publicada: true };
    
    if (categoria && categoria !== 'all') {
      filtro.categoria = categoria;
    }
    
    if (ciudad) {
      filtro.ciudad = new RegExp(ciudad, 'i');
    }
    
    if (buscar) {
      filtro.$or = [
        { titulo: new RegExp(buscar, 'i') },
        { contenido: new RegExp(buscar, 'i') }
      ];
    }

    // Calcular paginación
    const skip = (page - 1) * limit;

    // Obtener noticias
    const noticias = await Noticia.find(filtro)
      .populate('autor', 'nombre email')
      .sort({ fechaPublicacion: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Contar total
    const total = await Noticia.countDocuments(filtro);

    res.status(200).json({
      success: true,
      total,
      pagina: parseInt(page),
      totalPaginas: Math.ceil(total / limit),
      data: noticias
    });

  } catch (error) {
    console.error('Error al obtener noticias:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener noticias',
      detalles: error.message
    });
  }
};

/**
 * @desc    Obtener una noticia por ID
 * @route   GET /api/noticias/:id
 * @access  Public
 */
export const obtenerNoticiaPorId = async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id)
      .populate('autor', 'nombre email');

    if (!noticia) {
      return res.status(404).json({
        success: false,
        error: 'Noticia no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: noticia
    });

  } catch (error) {
    console.error('Error al obtener noticia:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener noticia',
      detalles: error.message
    });
  }
};

/**
 * @desc    Crear nueva noticia
 * @route   POST /api/noticias
 * @access  Private (requiere autenticación)
 */
export const crearNoticia = async (req, res) => {
  try {
    // Agregar el autor automáticamente
    req.body.autor = req.usuario.id;

    const noticia = await Noticia.create(req.body);

    res.status(201).json({
      success: true,
      mensaje: 'Noticia creada exitosamente',
      data: noticia
    });

  } catch (error) {
    console.error('Error al crear noticia:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear noticia',
      detalles: error.message
    });
  }
};

/**
 * @desc    Actualizar noticia
 * @route   PUT /api/noticias/:id
 * @access  Private
 */
export const actualizarNoticia = async (req, res) => {
  try {
    let noticia = await Noticia.findById(req.params.id);

    if (!noticia) {
      return res.status(404).json({
        success: false,
        error: 'Noticia no encontrada'
      });
    }

    // Verificar permisos (solo el autor o admin puede actualizar)
    if (noticia.autor.toString() !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para actualizar esta noticia'
      });
    }

    noticia = await Noticia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      mensaje: 'Noticia actualizada exitosamente',
      data: noticia
    });

  } catch (error) {
    console.error('Error al actualizar noticia:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar noticia',
      detalles: error.message
    });
  }
};

/**
 * @desc    Eliminar noticia
 * @route   DELETE /api/noticias/:id
 * @access  Private (admin)
 */
export const eliminarNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id);

    if (!noticia) {
      return res.status(404).json({
        success: false,
        error: 'Noticia no encontrada'
      });
    }

    // Verificar permisos
    if (noticia.autor.toString() !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para eliminar esta noticia'
      });
    }

    await noticia.deleteOne();

    res.status(200).json({
      success: true,
      mensaje: 'Noticia eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar noticia',
      detalles: error.message
    });
  }
};

/**
 * @desc    Obtener estadísticas de noticias
 * @route   GET /api/noticias/stats/general
 * @access  Private
 */
export const obtenerEstadisticas = async (req, res) => {
  try {
    const total = await Noticia.countDocuments();
    const porCategoria = await Noticia.aggregate([
      { $group: { _id: '$categoria', total: { $sum: 1 } } }
    ]);
    const porGravedad = await Noticia.aggregate([
      { $group: { _id: '$gravedad', total: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        porCategoria,
        porGravedad
      }
    });

  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas'
    });
  }
};

