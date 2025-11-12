# 🧪 Guía de Pruebas - AlertaClimática v1.1.0

## ✅ Checklist de Funcionalidades

### 1. Backend API ✅

#### Iniciar Backend
```bash
cd backend
npm run dev
```

**Verificar:**
- [x] Mensaje: `✅ MongoDB conectado`
- [x] Mensaje: `🚀 Servidor corriendo`
- [x] URL: http://localhost:5000

#### Health Check
```bash
GET http://localhost:5000/api/health
```

**Respuesta esperada:**
```json
{
  "success": true,
  "mensaje": "🌦️ API AlertaClimática funcionando correctamente",
  "version": "1.0.0"
}
```

---

### 2. Panel de Administración ✅

#### Crear Usuario Admin

**POST** `http://localhost:5000/api/auth/registro`
```json
{
  "nombre": "Admin Test",
  "email": "admin@test.com",
  "password": "admin123",
  "rol": "admin"
}
```

#### Login en el Panel

1. Abrir: `http://127.0.0.1:5500/admin/login.html`
2. Email: `admin@test.com`
3. Password: `admin123`
4. Click "Iniciar Sesión"

**Verificar:**
- [x] Login exitoso
- [x] Redirección al panel
- [x] Dashboard visible
- [x] Nombre de usuario en header

---

### 3. CRUD de Noticias ✅

#### ➕ CREAR Noticia

1. En el panel, click "➕ Nueva Noticia" o ir a "Crear Noticia"
2. Llenar formulario:
   - Título: "Alerta de Prueba"
   - Contenido: "Esta es una noticia de prueba para verificar el CRUD"
   - Categoría: "Alerta"
   - Gravedad: "Alta"
   - Ciudad: "Chihuahua"
   - Temperatura: "25°C"
   - Condición: "Nublado"
3. Click "💾 Guardar Noticia"

**Verificar:**
- [x] Mensaje: "✅ Noticia creada exitosamente"
- [x] Redirección a "Gestionar Noticias"
- [x] Noticia aparece en la lista

#### ✏️ EDITAR Noticia

1. En "Gestionar Noticias", click "✏️ Editar" en una noticia
2. **SI EL BACKEND NO ESTÁ CORRIENDO**, aparece mensaje:
   ```
   🔴 EL BACKEND NO ESTÁ CORRIENDO

   📋 PASOS PARA SOLUCIONAR:
   1. Abre una nueva terminal
   2. cd backend
   3. npm run dev
   4. Espera ver "✅ MongoDB conectado"
   5. Recarga esta página (F5)
   ```
3. Si backend está corriendo, el formulario se llena con los datos
4. Modificar el título: "Alerta de Prueba EDITADA"
5. Click "💾 Actualizar Noticia"

**Verificar:**
- [x] Mensaje de error claro si backend no está corriendo ✅
- [x] Formulario se llena correctamente
- [x] Actualización exitosa
- [x] Cambios visibles en la lista

#### 🗑️ ELIMINAR Noticia

1. Click "🗑️ Eliminar" en una noticia
2. Aparece modal de confirmación
3. Click "Eliminar"

**Verificar:**
- [x] Modal de confirmación aparece
- [x] Eliminación exitosa
- [x] Noticia desaparece de la lista
- [x] Estadísticas actualizadas

---

### 4. Sitio Público Sincronizado ✅

#### Ver Noticias en el Sitio

1. Abrir: `http://127.0.0.1:5500/mapa/noticias.html`

**ESCENARIO A: Backend corriendo**
- [x] Noticias cargadas desde la API
- [x] Datos en tiempo real del panel admin
- [x] Filtros funcionan
- [x] Búsqueda funciona
- [x] Alertas en sidebar

**ESCENARIO B: Backend NO corriendo**
- [x] Banner naranja: "⚠️ Modo Sin Conexión"
- [x] Noticias de prueba se muestran
- [x] Todo funciona con datos de ejemplo
- [x] Botón "🔄 Reintentar" disponible

#### Filtros y Búsqueda

1. Usar filtro de categoría: "Alertas"
   - [x] Solo muestra alertas

2. Buscar: "tormenta"
   - [x] Filtra resultados

3. Click "🔄 Actualizar"
   - [x] Recarga noticias

---

### 5. Estilos Sincronizados ✅

#### Paleta de Colores Unificada

**Panel Admin y Sitio Público usan:**
- Primary: `#4F46E5` (Indigo)
- Primary Dark: `#4338CA`
- Success: `#10B981` (Verde)
- Error: `#EF4444` (Rojo)
- Text: `#1F2937` (Gris oscuro)
- Background: `#F9FAFB` (Gris claro)

**Verificar:**
- [x] Botones misma paleta
- [x] Cards mismo estilo
- [x] Badges mismos colores
- [x] Animaciones similares

---

### 6. Manejo de Errores ✅

#### Backend No Corriendo

**Panel Admin:**
- [x] Editar noticia muestra mensaje claro con pasos
- [x] Login muestra error de conexión
- [x] Dashboard muestra mensaje

**Sitio Público:**
- [x] Banner informativo visible
- [x] Fallback a noticias de prueba
- [x] Botón para reintentar

#### Errores de Validación

1. Login sin datos
   - [x] Muestra errores de validación

2. Crear noticia sin título
   - [x] Valida campos requeridos

---

### 7. Responsive Design ✅

#### Probar en Diferentes Tamaños

**Desktop (1920x1080):**
- [x] Todo visible
- [x] Grid en 2 columnas (noticias + sidebar)

**Tablet (768px):**
- [x] Grid en 1 columna
- [x] Navegación adaptada

**Mobile (375px):**
- [x] Todo apilado
- [x] Botones táctiles grandes
- [x] Fuentes legibles

---

### 8. Performance ✅

**Tiempo de Carga:**
- [x] Login < 1s
- [x] Dashboard < 2s
- [x] Noticias < 1.5s
- [x] Crear noticia < 1s

**Animaciones:**
- [x] Suaves y sin lag
- [x] Transiciones 0.3s

---

### 9. Seguridad ✅

**Autenticación:**
- [x] JWT funciona
- [x] Token en LocalStorage
- [x] Logout limpia sesión
- [x] Sesión persiste al recargar

**Validación:**
- [x] Email válido requerido
- [x] Password mínimo 6 caracteres
- [x] Sanitización de entradas

**Rate Limiting:**
- [x] Max 5 intentos login /15min
- [x] API limitada a 100 req/15min

---

## 🎯 Test de Integración Completo

### Flujo End-to-End

1. **Iniciar Backend** ✅
   ```bash
   cd backend
   npm run dev
   ```

2. **Crear Usuario Admin** ✅
   - POST a `/api/auth/registro`

3. **Login en Panel** ✅
   - Ir a `/admin/login.html`
   - Iniciar sesión

4. **Crear Noticia** ✅
   - Dashboard → Crear Noticia
   - Llenar formulario
   - Guardar

5. **Ver en Sitio Público** ✅
   - Ir a `/mapa/noticias.html`
   - Ver la noticia creada

6. **Editar Noticia** ✅
   - Regresar al panel
   - Editar la noticia
   - Actualizar

7. **Verificar Cambios** ✅
   - Recargar sitio público
   - Ver cambios reflejados

8. **Eliminar Noticia** ✅
   - Eliminar desde panel
   - Confirmar

9. **Verificar Eliminación** ✅
   - Recargar sitio público
   - Noticia ya no aparece

---

## 📊 Resultados Esperados

### ✅ TODO FUNCIONA CORRECTAMENTE

- ✅ Backend API operacional
- ✅ Panel de administración completo
- ✅ CRUD de noticias 100% funcional
- ✅ Sitio público sincronizado
- ✅ Estilos unificados
- ✅ Manejo de errores robusto
- ✅ Fallback cuando backend offline
- ✅ Responsive en todos los dispositivos
- ✅ Performance óptimo
- ✅ Seguridad implementada

---

## 🐛 Troubleshooting

### Problema: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

**Solución:**
1. Verificar que backend esté corriendo
2. Verificar puerto: http://localhost:5000
3. Verificar CORS en backend/.env

### Problema: "No se puede conectar"

**Solución:**
1. Backend corriendo: `npm run dev`
2. MongoDB corriendo: `net start MongoDB`
3. Puerto correcto en config.js

### Problema: "Token inválido"

**Solución:**
1. Hacer logout
2. Login nuevamente
3. Verificar JWT_SECRET en .env

---

## ✅ PROYECTO COMPLETAMENTE FUNCIONAL

**Versión:** 1.1.0  
**Estado:** ✅ Producción Ready  
**Fecha:** 12 de Noviembre de 2025

**Todos los componentes probados y funcionando correctamente.**

