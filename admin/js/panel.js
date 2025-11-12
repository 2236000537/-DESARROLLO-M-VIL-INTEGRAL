/**
 * Panel de Administración - AlertaClimática
 * Gestión de noticias con API REST propia
 */

// Estado global
let noticiaEditando = null;
let noticiaAEliminar = null;

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', async () => {
  // Proteger página - solo usuarios autenticados
  const autenticado = await Auth.protegerPagina();
  if (!autenticado) return;

  // Cargar datos del usuario
  cargarDatosUsuario();

  // Cargar estadísticas
  cargarEstadisticas();

  // Configurar navegación
  configurarNavegacion();

  // Configurar botones y eventos
  configurarEventos();

  // Cargar noticias inicialmente
  cargarNoticias();
});

/**
 * Cargar datos del usuario en el header
 */
function cargarDatosUsuario() {
  const usuario = Auth.obtenerUsuario();
  if (usuario) {
    document.getElementById('userName').textContent = usuario.nombre;
    document.getElementById('userEmail').textContent = usuario.email;
  }
}

/**
 * Configurar navegación entre secciones
 */
function configurarNavegacion() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const section = item.dataset.section;
      if (section) {
        e.preventDefault();
        mostrarSeccion(section);
        
        // Actualizar estado activo
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });
}

/**
 * Mostrar sección específica
 */
function mostrarSeccion(seccion) {
  // Ocultar todas las secciones
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Mostrar la sección seleccionada
  const seccionElement = document.getElementById(`${seccion}-section`);
  if (seccionElement) {
    seccionElement.classList.add('active');
    
    // Si es la sección de noticias, recargar
    if (seccion === 'noticias') {
      cargarNoticias();
    }
    
    // Si es crear, limpiar formulario
    if (seccion === 'crear') {
      limpiarFormulario();
    }
  }
}

// Hacer la función global
window.mostrarSeccion = mostrarSeccion;

/**
 * Configurar eventos de botones
 */
function configurarEventos() {
  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      Auth.logout();
    }
  });

  // Formulario de noticia
  const form = document.getElementById('noticiaForm');
  form.addEventListener('submit', guardarNoticia);

  // Botón cancelar
  document.getElementById('btnCancelar').addEventListener('click', () => {
    limpiarFormulario();
    mostrarSeccion('noticias');
  });

  // Refrescar noticias
  document.getElementById('btnRefrescar').addEventListener('click', cargarNoticias);

  // Filtros
  document.getElementById('filtroCategoria').addEventListener('change', cargarNoticias);
  document.getElementById('buscarNoticia').addEventListener('input', debounce(cargarNoticias, 500));

  // Contador de caracteres
  document.getElementById('titulo').addEventListener('input', (e) => {
    document.getElementById('tituloCount').textContent = e.target.value.length;
  });

  document.getElementById('contenido').addEventListener('input', (e) => {
    document.getElementById('contenidoCount').textContent = e.target.value.length;
  });

  // Modal de confirmación
  document.getElementById('btnCancelarModal').addEventListener('click', cerrarModal);
  document.getElementById('btnConfirmarEliminar').addEventListener('click', confirmarEliminarNoticia);
}

/**
 * Cargar estadísticas del dashboard
 */
async function cargarEstadisticas() {
  try {
    const response = await fetch(`${CONFIG.API_URL}${CONFIG.ENDPOINTS.NOTICIAS.STATS}`, {
      headers: Auth.obtenerHeaders()
    });

    const data = await response.json();

    if (data.success) {
      // Total de noticias
      document.getElementById('totalNoticias').textContent = data.data.total;

      // Por categoría
      const categorias = {
        alert: 0,
        forecast: 0,
        report: 0
      };

      data.data.porCategoria.forEach(cat => {
        if (categorias.hasOwnProperty(cat._id)) {
          categorias[cat._id] = cat.total;
        }
      });

      document.getElementById('totalAlertas').textContent = categorias.alert;
      document.getElementById('totalPronosticos').textContent = categorias.forecast;
      document.getElementById('totalReportes').textContent = categorias.report;
    }

  } catch (error) {
    console.error('Error al cargar estadísticas:', error);
  }
}

/**
 * Cargar noticias desde la API
 */
async function cargarNoticias() {
  const container = document.getElementById('noticiasContainer');
  const loading = document.getElementById('loadingNoticias');
  const empty = document.getElementById('emptyNoticias');

  // Mostrar loading
  container.innerHTML = '';
  loading.style.display = 'block';
  empty.style.display = 'none';

  try {
    // Obtener filtros
    const categoria = document.getElementById('filtroCategoria').value;
    const buscar = document.getElementById('buscarNoticia').value;

    // Construir URL con parámetros
    let url = `${CONFIG.API_URL}${CONFIG.ENDPOINTS.NOTICIAS.BASE}?limit=50`;
    if (categoria) url += `&categoria=${categoria}`;
    if (buscar) url += `&buscar=${buscar}`;

    const response = await fetch(url);
    const data = await response.json();

    loading.style.display = 'none';

    if (data.success && data.data.length > 0) {
      renderizarNoticias(data.data);
    } else {
      empty.style.display = 'block';
    }

  } catch (error) {
    loading.style.display = 'none';
    console.error('Error al cargar noticias:', error);
    mostrarErrorFormulario('Error al cargar noticias. Verifica tu conexión.');
  }
}

/**
 * Renderizar noticias en el grid
 */
function renderizarNoticias(noticias) {
  const container = document.getElementById('noticiasContainer');
  
  container.innerHTML = noticias.map(noticia => `
    <div class="noticia-card">
      <span class="noticia-badge badge-${noticia.categoria}">
        ${traducirCategoria(noticia.categoria)}
      </span>
      <h3>${noticia.titulo}</h3>
      <p>${noticia.contenido.substring(0, 150)}${noticia.contenido.length > 150 ? '...' : ''}</p>
      <div class="noticia-meta">
        ${noticia.ciudad ? `<span>📍 ${noticia.ciudad}</span>` : ''}
        ${noticia.temperatura ? `<span>🌡️ ${noticia.temperatura}</span>` : ''}
        <span>📅 ${formatearFecha(noticia.fechaPublicacion)}</span>
      </div>
      <span class="noticia-gravedad gravedad-${noticia.gravedad}">
        ${noticia.gravedad.toUpperCase()}
      </span>
      <div class="noticia-actions">
        <button class="btn-edit" onclick="editarNoticia('${noticia._id}')">
          ✏️ Editar
        </button>
        <button class="btn-delete" onclick="eliminarNoticia('${noticia._id}')">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Guardar noticia (crear o actualizar)
 */
async function guardarNoticia(e) {
  e.preventDefault();

  const btn = document.getElementById('btnGuardar');
  const btnText = btn.querySelector('.btn-text');
  const spinner = btn.querySelector('.spinner');

  // Deshabilitar botón
  btn.disabled = true;
  btnText.style.display = 'none';
  spinner.style.display = 'inline-block';

  try {
    // Obtener datos del formulario
    const noticiaData = {
      titulo: document.getElementById('titulo').value.trim(),
      contenido: document.getElementById('contenido').value.trim(),
      categoria: document.getElementById('categoria').value,
      gravedad: document.getElementById('gravedad').value,
      ciudad: document.getElementById('ciudad').value.trim() || 'General',
      temperatura: document.getElementById('temperatura').value.trim() || '--°C',
      condicion: document.getElementById('condicion').value.trim() || '--'
    };

    // Determinar si es creación o actualización
    const noticiaId = document.getElementById('noticiaId').value;
    const esEdicion = !!noticiaId;

    const url = esEdicion 
      ? `${CONFIG.API_URL}${CONFIG.ENDPOINTS.NOTICIAS.BASE}/${noticiaId}`
      : `${CONFIG.API_URL}${CONFIG.ENDPOINTS.NOTICIAS.BASE}`;

    const metodo = esEdicion ? 'PUT' : 'POST';

    // Enviar petición
    const response = await fetch(url, {
      method: metodo,
      headers: Auth.obtenerHeaders(),
      body: JSON.stringify(noticiaData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al guardar noticia');
    }

    // Mostrar mensaje de éxito
    mostrarExitoFormulario(esEdicion ? 'Noticia actualizada exitosamente' : 'Noticia creada exitosamente');

    // Limpiar formulario y recargar noticias
    setTimeout(() => {
      limpiarFormulario();
      cargarNoticias();
      cargarEstadisticas();
      mostrarSeccion('noticias');
    }, 1500);

  } catch (error) {
    console.error('Error al guardar noticia:', error);
    mostrarErrorFormulario(error.message);
    btn.disabled = false;
    btnText.style.display = 'inline';
    spinner.style.display = 'none';
  }
}

/**
 * Editar noticia
 */
async function editarNoticia(id) {
  try {
    // Obtener noticia de la API
    const url = `${CONFIG.API_URL}${CONFIG.ENDPOINTS.NOTICIAS.BASE}/${id}`;
    console.log('🔍 Cargando noticia desde:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Verificar que sea JSON antes de parsear
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('BACKEND_NO_RUNNING');
    }

    const data = await response.json();

    if (data.success) {
      const noticia = data.data;

      // Llenar formulario
      document.getElementById('noticiaId').value = noticia._id;
      document.getElementById('titulo').value = noticia.titulo;
      document.getElementById('contenido').value = noticia.contenido;
      document.getElementById('categoria').value = noticia.categoria;
      document.getElementById('gravedad').value = noticia.gravedad;
      document.getElementById('ciudad').value = noticia.ciudad || 'General';
      document.getElementById('temperatura').value = noticia.temperatura || '';
      document.getElementById('condicion').value = noticia.condicion || '';

      // Actualizar contadores
      document.getElementById('tituloCount').textContent = noticia.titulo.length;
      document.getElementById('contenidoCount').textContent = noticia.contenido.length;

      // Cambiar título del formulario
      document.getElementById('formTitle').textContent = '✏️ Editar Noticia';
      document.getElementById('btnGuardar').querySelector('.btn-text').textContent = '💾 Actualizar Noticia';

      // Mostrar sección de crear/editar
      mostrarSeccion('crear');
    } else {
      throw new Error(data.error || 'Error al obtener la noticia');
    }

  } catch (error) {
    console.error('❌ Error al cargar noticia:', error);
    
    // Mensaje más descriptivo
    let mensajeError = '❌ Error al cargar la noticia.\n\n';
    
    if (error.message === 'BACKEND_NO_RUNNING' || error.message.includes('Unexpected token') || error.message.includes('JSON')) {
      mensajeError += '🔴 EL BACKEND NO ESTÁ CORRIENDO\n\n';
      mensajeError += '📋 PASOS PARA SOLUCIONAR:\n';
      mensajeError += '1. Abre una nueva terminal\n';
      mensajeError += '2. cd backend\n';
      mensajeError += '3. npm run dev\n';
      mensajeError += '4. Espera ver "✅ MongoDB conectado"\n';
      mensajeError += '5. Recarga esta página (F5)';
    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      mensajeError += '🔴 No se puede conectar con el backend.\n';
      mensajeError += '¿Está corriendo en http://localhost:5000?\n\n';
      mensajeError += 'Ejecuta: cd backend && npm run dev';
    } else if (error.message.includes('404')) {
      mensajeError += '📡 Noticia no encontrada. Puede que haya sido eliminada.';
    } else if (error.message.includes('401')) {
      mensajeError += '🔐 Sesión expirada. Redirigiendo al login...';
      setTimeout(() => Auth.logout(), 2000);
    } else {
      mensajeError += 'Detalles: ' + error.message;
    }
    
    alert(mensajeError);
  }
}

// Hacer función global
window.editarNoticia = editarNoticia;

/**
 * Eliminar noticia (mostrar modal)
 */
function eliminarNoticia(id) {
  noticiaAEliminar = id;
  document.getElementById('modalEliminar').style.display = 'flex';
}

// Hacer función global
window.eliminarNoticia = eliminarNoticia;

/**
 * Confirmar eliminación
 */
async function confirmarEliminarNoticia() {
  if (!noticiaAEliminar) return;

  try {
    const response = await fetch(
      `${CONFIG.API_URL}${CONFIG.ENDPOINTS.NOTICIAS.BASE}/${noticiaAEliminar}`,
      {
        method: 'DELETE',
        headers: Auth.obtenerHeaders()
      }
    );

    // Verificar respuesta
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('No tienes permisos para eliminar esta noticia. Solo los administradores pueden eliminar.');
      } else if (response.status === 404) {
        throw new Error('Noticia no encontrada.');
      } else {
        throw new Error(`Error del servidor: ${response.status}`);
      }
    }

    const data = await response.json();

    if (data.success) {
      cerrarModal();
      
      // Mostrar mensaje de éxito
      const successMsg = document.createElement('div');
      successMsg.className = 'toast-success';
      successMsg.innerHTML = '✅ Noticia eliminada exitosamente';
      successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #D1FAE5;
        color: #065F46;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
      `;
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
      
      // Recargar datos
      cargarNoticias();
      cargarEstadisticas();
    } else {
      throw new Error(data.error || 'Error al eliminar la noticia');
    }

  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    cerrarModal();
    
    // Mensaje de error más descriptivo
    let mensajeError = '❌ Error al eliminar la noticia.\n\n';
    
    if (error.message.includes('Failed to fetch')) {
      mensajeError += '🔴 El servidor backend no está respondiendo.\n';
      mensajeError += 'Verifica que esté corriendo en http://localhost:5000';
    } else {
      mensajeError += error.message;
    }
    
    alert(mensajeError);
  }
}

/**
 * Cerrar modal
 */
function cerrarModal() {
  document.getElementById('modalEliminar').style.display = 'none';
  noticiaAEliminar = null;
}

/**
 * Limpiar formulario
 */
function limpiarFormulario() {
  document.getElementById('noticiaForm').reset();
  document.getElementById('noticiaId').value = '';
  document.getElementById('tituloCount').textContent = '0';
  document.getElementById('contenidoCount').textContent = '0';
  document.getElementById('formTitle').textContent = '➕ Crear Noticia';
  document.getElementById('btnGuardar').querySelector('.btn-text').textContent = '💾 Guardar Noticia';
  document.getElementById('btnGuardar').disabled = false;
  document.getElementById('successAlert').style.display = 'none';
  document.getElementById('errorAlertForm').style.display = 'none';
}

/**
 * Mostrar mensaje de éxito en formulario
 */
function mostrarExitoFormulario(mensaje) {
  const alert = document.getElementById('successAlert');
  const messageEl = document.getElementById('successMessage');
  
  messageEl.textContent = mensaje;
  alert.style.display = 'flex';
  document.getElementById('errorAlertForm').style.display = 'none';
}

/**
 * Mostrar mensaje de error en formulario
 */
function mostrarErrorFormulario(mensaje) {
  const alert = document.getElementById('errorAlertForm');
  const messageEl = document.getElementById('errorMessageForm');
  
  messageEl.textContent = mensaje;
  alert.style.display = 'flex';
  document.getElementById('successAlert').style.display = 'none';
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

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

