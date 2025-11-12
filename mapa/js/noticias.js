/**
 * Noticias del Clima - Conectado con API
 * AlertaClimática
 */

// Configuración de la API
const API_URL = 'http://localhost:5000/api';

// Estado global
let noticiasCache = [];
let categoriaActual = 'all';
let busquedaActual = '';

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  configurarEventos();
  cargarNoticias();
  cargarClimaActual();
});

/**
 * Configurar eventos
 */
function configurarEventos() {
  // Botón de búsqueda
  const btnSearch = document.getElementById('btnSearch');
  if (btnSearch) {
    btnSearch.addEventListener('click', () => {
      busquedaActual = document.getElementById('q').value;
      cargarNoticias();
    });
  }

  // Enter en búsqueda
  const inputBusqueda = document.getElementById('q');
  if (inputBusqueda) {
    inputBusqueda.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        busquedaActual = e.target.value;
        cargarNoticias();
      }
    });
  }

  // Filtro por categoría
  const filtroSelect = document.getElementById('filter');
  if (filtroSelect) {
    filtroSelect.addEventListener('change', (e) => {
      categoriaActual = e.target.value;
      cargarNoticias();
    });
  }

  // Botón refresh
  const btnRefresh = document.getElementById('refresh');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      cargarNoticias();
      cargarClimaActual();
    });
  }

  // Botón de ubicación
  const btnLocation = document.getElementById('btnLocation');
  if (btnLocation) {
    btnLocation.addEventListener('click', obtenerUbicacion);
  }

  // Botón de detalles
  const btnDetails = document.getElementById('btnDetails');
  if (btnDetails) {
    btnDetails.addEventListener('click', () => {
      window.location.href = 'mapa.html';
    });
  }
}

/**
 * Cargar noticias desde la API
 */
async function cargarNoticias() {
  const container = document.getElementById('articles');
  
  if (!container) return;

  // Mostrar loading
  container.innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <div style="font-size: 48px; margin-bottom: 16px;">⏳</div>
      <p style="color: #6B7280;">Cargando noticias...</p>
    </div>
  `;

  try {
    // Construir URL con filtros
    let url = `${API_URL}/noticias?limit=20`;
    
    if (categoriaActual && categoriaActual !== 'all') {
      url += `&categoria=${categoriaActual}`;
    }
    
    if (busquedaActual) {
      url += `&buscar=${encodeURIComponent(busquedaActual)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.success && data.data.length > 0) {
      noticiasCache = data.data;
      renderizarNoticias(data.data);
      actualizarAlertas(data.data);
    } else {
      mostrarSinNoticias();
    }

  } catch (error) {
    console.error('Error al cargar noticias:', error);
    mostrarError();
  }
}

/**
 * Renderizar noticias en el DOM
 */
function renderizarNoticias(noticias) {
  const container = document.getElementById('articles');
  
  if (!container) return;

  container.innerHTML = noticias.map(noticia => `
    <article class="article-item">
      <div class="article-header">
        <span class="badge badge-${noticia.categoria}">
          ${traducirCategoria(noticia.categoria)}
        </span>
        <span class="article-date">${formatearFecha(noticia.fechaPublicacion)}</span>
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
          ${noticia.gravedad.toUpperCase()}
        </span>
        <span class="article-author">Por: ${noticia.autor?.nombre || 'AlertaClimática'}</span>
      </div>
    </article>
  `).join('');
}

/**
 * Mostrar mensaje cuando no hay noticias
 */
function mostrarSinNoticias() {
  const container = document.getElementById('articles');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align: center; padding: 60px 20px;">
      <div style="font-size: 64px; margin-bottom: 16px;">📭</div>
      <h3 style="color: #1F2937; margin-bottom: 8px;">No hay noticias disponibles</h3>
      <p style="color: #6B7280;">Intenta cambiar los filtros de búsqueda</p>
    </div>
  `;
}

/**
 * Mostrar mensaje de error
 */
function mostrarError() {
  const container = document.getElementById('articles');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align: center; padding: 60px 20px;">
      <div style="font-size: 64px; margin-bottom: 16px;">⚠️</div>
      <h3 style="color: #1F2937; margin-bottom: 8px;">Error al cargar noticias</h3>
      <p style="color: #6B7280; margin-bottom: 16px;">
        Verifica que el servidor esté corriendo en http://localhost:5000
      </p>
      <button onclick="cargarNoticias()" style="background: #4F46E5; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">
        🔄 Reintentar
      </button>
    </div>
  `;
}

/**
 * Actualizar alertas recientes
 */
function actualizarAlertas(noticias) {
  const alertsContainer = document.getElementById('alerts');
  if (!alertsContainer) return;

  const alertas = noticias
    .filter(n => n.categoria === 'alert')
    .slice(0, 3);

  if (alertas.length === 0) {
    alertsContainer.innerHTML = '<li style="color: #6B7280; font-size: 14px;">No hay alertas activas</li>';
    return;
  }

  alertsContainer.innerHTML = alertas.map(alerta => `
    <li class="alert-item">
      <div class="alert-icon ${alerta.gravedad}">⚠️</div>
      <div>
        <div style="font-weight: 600; font-size: 13px;">${alerta.titulo}</div>
        <div style="font-size: 11px; color: #6B7280;">${alerta.ciudad || 'General'} - ${formatearFechaCorta(alerta.fechaPublicacion)}</div>
      </div>
    </li>
  `).join('');
}

/**
 * Cargar clima actual (simulado o de API)
 */
async function cargarClimaActual() {
  const tempElement = document.getElementById('temp');
  const condElement = document.getElementById('cond');
  const cityElement = document.getElementById('city');

  if (!tempElement || !condElement) return;

  // Aquí puedes integrar una API de clima real
  // Por ahora mostramos datos de ejemplo
  tempElement.textContent = '27°C';
  condElement.textContent = 'Parcialmente nublado';
  if (cityElement) {
    cityElement.textContent = 'Chihuahua, MX';
  }
}

/**
 * Obtener ubicación del usuario
 */
function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Ubicación obtenida:', position.coords);
        alert(`Ubicación: ${position.coords.latitude}, ${position.coords.longitude}`);
      },
      (error) => {
        console.error('Error al obtener ubicación:', error);
        alert('No se pudo obtener la ubicación. Verifica los permisos del navegador.');
      }
    );
  } else {
    alert('Tu navegador no soporta geolocalización');
  }
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
