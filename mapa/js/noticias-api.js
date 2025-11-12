/**
 * Integración con API - AlertaClimática
 * Carga noticias desde el backend
 */

const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  ENDPOINTS: {
    NOTICIAS: '/noticias',
    HEALTH: '/health'
  }
};

// Estado global
let todasLasNoticias = [];

/**
 * Verificar si el backend está disponible
 */
async function verificarBackend() {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Cargar noticias desde la API
 */
async function cargarNoticiasDesdeAPI() {
  const container = document.getElementById('articles');
  
  if (!container) return;

  // Mostrar loading
  container.innerHTML = `
    <div style="text-align: center; padding: 60px 20px;">
      <div style="font-size: 64px; margin-bottom: 16px; animation: spin 1s linear infinite;">⏳</div>
      <h3 style="color: var(--text); margin-bottom: 8px;">Cargando noticias...</h3>
      <p style="color: var(--text-light);">Conectando con el servidor...</p>
    </div>
  `;

  try {
    // Verificar si el backend está corriendo
    const backendDisponible = await verificarBackend();
    
    if (!backendDisponible) {
      mostrarBackendNoDisponible(container);
      cargarNoticiasDePrueba();
      return;
    }

    // Cargar noticias reales
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NOTICIAS}?limit=50`);
    
    if (!response.ok) {
      throw new Error('Error al cargar noticias');
    }

    const data = await response.json();

    if (data.success && data.data.length > 0) {
      todasLasNoticias = data.data;
      renderizarNoticias(data.data);
      actualizarAlertas(data.data);
      console.log('✅ Noticias cargadas desde la API:', data.data.length);
    } else {
      mostrarSinNoticias(container);
    }

  } catch (error) {
    console.error('❌ Error al cargar noticias:', error);
    mostrarErrorConexion(container);
    // Cargar noticias de prueba como fallback
    cargarNoticiasDePrueba();
  }
}

/**
 * Renderizar noticias en el DOM
 */
function renderizarNoticias(noticias) {
  const container = document.getElementById('articles');
  
  if (!container || noticias.length === 0) return;

  container.innerHTML = noticias.map((noticia, index) => `
    <article class="article-item" style="animation-delay: ${index * 0.1}s;">
      <div class="article-header">
        <span class="badge badge-${noticia.categoria}">
          ${traducirCategoria(noticia.categoria)}
        </span>
        <span class="article-date">${formatearFecha(noticia.fechaPublicacion || noticia.fecha)}</span>
      </div>
      
      <h3 class="article-title">${noticia.titulo}</h3>
      
      <p class="article-content">${noticia.contenido}</p>
      
      <div class="article-meta">
        ${noticia.ciudad ? `<span>📍 ${noticia.ciudad}</span>` : ''}
        ${noticia.temperatura ? `<span>🌡️ ${noticia.temperatura}</span>` : ''}
        ${noticia.condicion ? `<span>☁️ ${noticia.condicion}</span>` : ''}
      </div>
      
      <div class="article-footer">
        <span class="gravedad gravedad-${noticia.gravedad}">
          ${(noticia.gravedad || 'media').toUpperCase()}
        </span>
        <span class="article-author">
          Por: ${noticia.autor?.nombre || 'AlertaClimática'}
        </span>
      </div>
    </article>
  `).join('');
}

/**
 * Actualizar alertas recientes en el sidebar
 */
function actualizarAlertas(noticias) {
  const alertsContainer = document.getElementById('alerts');
  if (!alertsContainer) return;

  const alertas = noticias
    .filter(n => n.categoria === 'alert')
    .slice(0, 3);

  if (alertas.length === 0) {
    alertsContainer.innerHTML = '<li style="color: var(--text-light); font-size: 14px; padding: 12px;">No hay alertas activas</li>';
    return;
  }

  alertsContainer.innerHTML = alertas.map(alerta => `
    <li class="alert-item">
      <div class="alert-icon ${alerta.gravedad}">⚠️</div>
      <div style="flex: 1;">
        <div style="font-weight: 600; font-size: 13px; color: var(--text);">${alerta.titulo}</div>
        <div style="font-size: 11px; color: var(--text-light); margin-top: 2px;">
          ${alerta.ciudad || 'General'} - ${formatearFechaCorta(alerta.fechaPublicacion || alerta.fecha)}
        </div>
      </div>
    </li>
  `).join('');
}

/**
 * Filtrar noticias por categoría
 */
function filtrarPorCategoria(categoria) {
  if (categoria === 'all' || !categoria) {
    renderizarNoticias(todasLasNoticias);
  } else {
    const filtradas = todasLasNoticias.filter(n => n.categoria === categoria);
    renderizarNoticias(filtradas);
  }
}

/**
 * Buscar noticias
 */
function buscarNoticias(termino) {
  if (!termino || termino.trim() === '') {
    renderizarNoticias(todasLasNoticias);
    return;
  }

  const terminoLower = termino.toLowerCase();
  const encontradas = todasLasNoticias.filter(noticia => 
    noticia.titulo.toLowerCase().includes(terminoLower) ||
    noticia.contenido.toLowerCase().includes(terminoLower) ||
    (noticia.ciudad && noticia.ciudad.toLowerCase().includes(terminoLower))
  );

  renderizarNoticias(encontradas);
}

/**
 * Mostrar mensaje cuando backend no está disponible
 */
function mostrarBackendNoDisponible(container) {
  const banner = document.createElement('div');
  banner.style.cssText = `
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    display: flex;
    align-items: center;
    gap: 12px;
  `;
  banner.innerHTML = `
    <span style="font-size: 24px;">⚠️</span>
    <div style="flex: 1;">
      <div style="font-weight: 600; margin-bottom: 4px;">Modo Sin Conexión</div>
      <div style="font-size: 13px; opacity: 0.9;">
        El servidor no está disponible. Mostrando noticias de ejemplo.
      </div>
    </div>
  `;
  
  const parent = container.parentElement;
  parent.insertBefore(banner, container);
}

/**
 * Mostrar mensaje de error de conexión
 */
function mostrarErrorConexion(container) {
  container.innerHTML = `
    <div style="text-align: center; padding: 60px 20px;">
      <div style="font-size: 64px; margin-bottom: 16px;">🔌</div>
      <h3 style="color: var(--text); margin-bottom: 12px;">Error de Conexión</h3>
      <p style="color: var(--text-light); margin-bottom: 16px;">
        No se pudo conectar con el servidor.<br>
        Mostrando noticias de ejemplo.
      </p>
      <button 
        onclick="location.reload()" 
        style="
          background: var(--primary);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
        "
        onmouseover="this.style.background='var(--primary-dark)'"
        onmouseout="this.style.background='var(--primary)'"
      >
        🔄 Reintentar
      </button>
    </div>
  `;
}

/**
 * Mostrar mensaje cuando no hay noticias
 */
function mostrarSinNoticias(container) {
  container.innerHTML = `
    <div style="text-align: center; padding: 60px 20px;">
      <div style="font-size: 64px; margin-bottom: 16px;">📭</div>
      <h3 style="color: var(--text); margin-bottom: 8px;">No hay noticias disponibles</h3>
      <p style="color: var(--text-light);">Aún no se han publicado noticias. Vuelve pronto.</p>
    </div>
  `;
}

/**
 * Cargar noticias de prueba (fallback)
 */
function cargarNoticiasDePrueba() {
  const noticiasPrueba = [
    {
      titulo: "Alerta de Tormenta Eléctrica en Chihuahua",
      contenido: "Se espera una tormenta eléctrica intensa durante la tarde-noche. Se recomienda evitar actividades al aire libre y mantenerse en lugares seguros. Las autoridades meteorológicas han emitido una alerta amarilla para la región.",
      categoria: "alert",
      gravedad: "alta",
      ciudad: "Chihuahua",
      temperatura: "28°C",
      condicion: "Tormentas",
      fecha: new Date().toISOString(),
      autor: { nombre: "AlertaClimática" }
    },
    {
      titulo: "Pronóstico: Temperaturas Agradables para el Fin de Semana",
      contenido: "Este fin de semana se esperan temperaturas agradables con cielos mayormente despejados. Ideal para actividades al aire libre con la familia. La temperatura máxima será de 25°C y la mínima de 15°C.",
      categoria: "forecast",
      gravedad: "baja",
      ciudad: "Chihuahua",
      temperatura: "22°C",
      condicion: "Despejado",
      fecha: new Date(Date.now() - 86400000).toISOString(),
      autor: { nombre: "AlertaClimática" }
    },
    {
      titulo: "Reporte: Calidad del Aire Mejora Después de las Lluvias",
      contenido: "Las lluvias de los últimos días han mejorado significativamente la calidad del aire en la ciudad. Los niveles de contaminación han bajado a rangos aceptables. Se recomienda aprovechar para realizar actividades al aire libre.",
      categoria: "report",
      gravedad: "media",
      ciudad: "Chihuahua",
      temperatura: "24°C",
      condicion: "Nublado",
      fecha: new Date(Date.now() - 172800000).toISOString(),
      autor: { nombre: "AlertaClimática" }
    }
  ];

  todasLasNoticias = noticiasPrueba;
  renderizarNoticias(noticiasPrueba);
  actualizarAlertas(noticiasPrueba);
}

/**
 * Utilidades
 */
function traducirCategoria(categoria) {
  const traducciones = {
    'alert': 'Alerta',
    'forecast': 'Pronóstico',
    'report': 'Reporte',
    'all': 'General'
  };
  return traducciones[categoria] || categoria;
}

function formatearFecha(fecha) {
  const date = new Date(fecha);
  const opciones = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('es-MX', opciones);
}

function formatearFechaCorta(fecha) {
  const date = new Date(fecha);
  const opciones = { 
    month: 'short', 
    day: 'numeric'
  };
  return date.toLocaleDateString('es-MX', opciones);
}

// Inicializar cuando cargue el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarNoticias);
} else {
  inicializarNoticias();
}

function inicializarNoticias() {
  // Cargar noticias
  cargarNoticiasDesdeAPI();

  // Configurar filtros
  const filtroSelect = document.getElementById('filter');
  if (filtroSelect) {
    filtroSelect.addEventListener('change', (e) => {
      filtrarPorCategoria(e.target.value);
    });
  }

  // Configurar búsqueda
  const btnSearch = document.getElementById('btnSearch');
  const inputSearch = document.getElementById('q');
  
  if (btnSearch && inputSearch) {
    btnSearch.addEventListener('click', () => {
      buscarNoticias(inputSearch.value);
    });
    
    inputSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        buscarNoticias(e.target.value);
      }
    });
  }

  // Botón refresh
  const btnRefresh = document.getElementById('refresh');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      cargarNoticiasDesdeAPI();
    });
  }
}

// Añadir estilo de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .article-item {
    animation: slideIn 0.3s ease forwards;
    opacity: 0;
  }
`;
document.head.appendChild(style);

