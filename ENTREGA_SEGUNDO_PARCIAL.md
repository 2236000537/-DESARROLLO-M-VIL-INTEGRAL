# 📝 Entrega Segundo Parcial - AlertaClimática

## Información del Proyecto

**Proyecto:** AlertaClimática - Plataforma Web Informativa  
**Versión:** 1.0.0  
**Fecha:** 12 de Noviembre de 2025

### Equipo Scrum

- **Scrum Master:** Elena Natalia Diosdado Arellano
- **Product Owner:** José Armando Valenzuela Olivares

### Arquitectura

- **Patrón:** MVC (Modelo-Vista-Controlador)
- **Metodología:** Scrum
- **Stack:** HTML, CSS, JavaScript, Node.js, Express, MongoDB

---

## ✅ CUMPLIMIENTO DE LA RÚBRICA (100%)

### 1️⃣ Integración con Servicio en la Nube (25%)

#### HU-04 - Panel de Administración (Login Seguro)

**✅ Tarea 1.1: Elección y Configuración del Servicio Cloud**

- **Decisión:** API REST propia (más control y aprendizaje)
- **Stack:** Node.js + Express + MongoDB
- **Ubicación:** Carpeta `backend/`
- **Configuración:** Archivo `.env` con variables de entorno

**Archivos relacionados:**
```
backend/
├── config/database.js         ← Conexión MongoDB
├── server.js                  ← Servidor Express
├── .env.example               ← Plantilla de configuración
└── README.md                  ← Documentación completa
```

**✅ Tarea 1.2: Implementar Autenticación**

- **Método:** JWT (JSON Web Tokens)
- **Seguridad:** Bcrypt para hash de contraseñas
- **Endpoints implementados:**
  - `POST /api/auth/registro` - Registro de usuarios
  - `POST /api/auth/login` - Inicio de sesión
  - `GET /api/auth/perfil` - Obtener perfil
  - `GET /api/auth/verificar` - Verificar token

**Archivos relacionados:**
```
backend/
├── controllers/authController.js    ← Lógica de autenticación
├── models/User.js                   ← Modelo de usuario
├── routes/authRoutes.js             ← Rutas de auth
└── middlewares/auth.js              ← Middleware JWT

admin/
├── login.html                       ← Página de login
├── panel.html                       ← Dashboard admin
└── js/
    ├── auth.js                      ← Módulo de autenticación
    ├── login.js                     ← Lógica del login
    └── panel.js                     ← Lógica del panel
```

**✅ Tarea 1.3: Diagrama de Arquitectura**

- **Ubicación:** `ARQUITECTURA.md`
- **Contenido:**
  - Diagrama completo del flujo de datos
  - Frontend → API REST → MongoDB
  - Flujo de autenticación JWT
  - Capas de seguridad

---

### 2️⃣ Principios de Codificación Segura (25%)

**✅ Tarea 2.1: Uso de HTTPS y Tokens**

- **JWT implementado:** ✅
  - Tokens firmados con clave secreta
  - Expiración configurable (24h)
  - Header Authorization: Bearer {token}
  - Validación en cada petición protegida

- **HTTPS:** Configurado para producción en `server.js`
  - Helmet para headers seguros
  - CORS configurado específicamente
  - Redirección HTTP → HTTPS recomendada

**Archivos relacionados:**
```
backend/
├── server.js                   ← Configuración Helmet, CORS
├── middlewares/auth.js         ← Verificación JWT
└── middlewares/security.js     ← Rate limiting, sanitización
```

**✅ Tarea 2.2: Protección de Credenciales**

- **Variables de entorno:** ✅
  - Archivo `.env` para credenciales
  - `.env.example` como plantilla (SIN credenciales reales)
  - `.gitignore` configurado para excluir `.env`
  - JWT_SECRET en variable de entorno
  - MONGODB_URI en variable de entorno

**Archivos relacionados:**
```
backend/
├── .env.example               ← Plantilla SIN credenciales
├── .gitignore                 ← Excluye .env
└── server.js                  ← Carga dotenv
```

**Contenido de `.gitignore`:**
```gitignore
# Variables de entorno (¡NUNCA subir!)
.env
.env.local
.env.production

# Dependencias
node_modules/
```

**✅ Tarea 2.3: Validación y Manejo de Errores**

- **Validación de entradas:** ✅
  - express-validator en todas las rutas
  - Validación de email (formato correcto)
  - Validación de contraseña (mínimo 6 caracteres, letras y números)
  - Sanitización contra inyección NoSQL
  - Validación de campos requeridos

- **Manejo de errores:** ✅
  - Try-catch en todos los controladores
  - Mensajes de error descriptivos
  - Códigos HTTP apropiados (401, 403, 404, 500)
  - Logs de errores en consola
  - Respuestas JSON estandarizadas

**Archivos relacionados:**
```
backend/
├── middlewares/validator.js        ← Validaciones
├── middlewares/security.js         ← Sanitización
├── controllers/authController.js   ← Try-catch, manejo errores
└── controllers/noticiaController.js ← Try-catch, validaciones

admin/js/
├── login.js                        ← Validación frontend
└── panel.js                        ← Validación y manejo errores
```

**Características de seguridad implementadas:**

1. **Rate Limiting:**
   - Login: 5 intentos / 15 minutos
   - API General: 100 requests / 15 minutos

2. **Sanitización:**
   - Prevención de inyección NoSQL
   - Escape de caracteres especiales
   - Validación de tipos de datos

3. **Headers de Seguridad (Helmet):**
   - Content Security Policy
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

---

### 3️⃣ Estrategias de Versionamiento Profesional (20%)

**✅ Tarea 3.1: Gestión de Ramas**

- **Ramas creadas:**
  - `main` - Rama de producción
  - `develop` - Rama de desarrollo
  - `feature/login-seguro` - Feature branch

**Comandos ejecutados:**
```bash
git init
git branch -M main
git branch develop
git checkout -b feature/login-seguro
```

**Documentación:** Ver `GIT_SETUP.md`

**✅ Tarea 3.2: Flujo de Trabajo**

- **Feature branch:** `feature/login-seguro` ✅
- **Commits descriptivos:** ✅

**Ejemplo de commits:**
```bash
git commit -m "Add: Sistema de autenticación JWT

- Implementación de login y registro
- Middleware de protección de rutas
- Validación de entradas
- Hash de contraseñas con bcrypt
- Variables de entorno para seguridad"

git commit -m "Add: Panel de administración

- Dashboard con estadísticas
- CRUD completo de noticias
- Validación y sanitización
- Diseño responsive"

git commit -m "Add: Principios de seguridad

- Rate limiting implementado
- Helmet para headers seguros
- CORS configurado
- Sanitización contra NoSQL injection"
```

**✅ Tarea 3.3: Versionamiento Semántico**

- **Versión:** v1.0.0 ✅
- **Tag creado:** ✅

**Comando ejecutado:**
```bash
git tag -a v1.0.0 -m "Versión 1.0.0 - Primera versión estable

Características:
- Panel de administración seguro
- Autenticación JWT con API REST propia
- CRUD completo de noticias
- Principios de codificación segura
- Validación y sanitización de entradas
- Rate limiting y protección
- Variables de entorno
- Documentación completa
- Git flow configurado

Roles Scrum:
- Scrum Master: Elena Natalia Diosdado Arellano
- Product Owner: José Armando Valenzuela Olivares"

git push origin v1.0.0
```

**Formato SemVer:** `MAJOR.MINOR.PATCH`
- **1.0.0** = Primera versión estable completa

**Documentación:** Ver `GIT_SETUP.md` y `README.md`

---

## 📁 ESTRUCTURA DEL PROYECTO ENTREGADO

```
AlertaClimática/
│
├── 📱 FRONTEND
│   ├── index.html                          # Página principal
│   ├── mapa/                               # Módulos públicos
│   │   ├── mapa.html                       # Mapa climático
│   │   ├── noticias.html                   # Noticias públicas
│   │   ├── foro.html                       # Foro
│   │   ├── css/                            # Estilos
│   │   └── js/                             # Scripts
│   │
│   └── admin/                              # PANEL DE ADMINISTRACIÓN
│       ├── login.html                      # ✅ Login seguro
│       ├── panel.html                      # ✅ Dashboard admin
│       ├── css/
│       │   ├── login.css                   # Estilos del login
│       │   └── panel.css                   # Estilos del panel
│       └── js/
│           ├── config.js                   # Configuración global
│           ├── auth.js                     # ✅ Módulo autenticación
│           ├── login.js                    # Lógica del login
│           └── panel.js                    # Lógica del panel
│
├── 🔧 BACKEND (API REST PROPIA)
│   ├── config/
│   │   └── database.js                     # ✅ Conexión MongoDB
│   ├── controllers/
│   │   ├── authController.js               # ✅ Lógica de autenticación
│   │   └── noticiaController.js            # ✅ Lógica de noticias
│   ├── models/
│   │   ├── User.js                         # ✅ Modelo de usuario
│   │   └── Noticia.js                      # ✅ Modelo de noticia
│   ├── routes/
│   │   ├── authRoutes.js                   # ✅ Rutas de auth
│   │   └── noticiaRoutes.js                # ✅ Rutas de noticias
│   ├── middlewares/
│   │   ├── auth.js                         # ✅ JWT validation
│   │   ├── validator.js                    # ✅ Validación entradas
│   │   └── security.js                     # ✅ Rate limit, sanitización
│   ├── .env.example                        # ✅ Plantilla sin credenciales
│   ├── .gitignore                          # ✅ Excluye .env
│   ├── package.json                        # Dependencias
│   ├── server.js                           # ✅ Servidor Express
│   └── README.md                           # Documentación del backend
│
├── 📄 DOCUMENTACIÓN
│   ├── README.md                           # ✅ Documentación principal
│   ├── ARQUITECTURA.md                     # ✅ Diagrama de arquitectura
│   ├── GIT_SETUP.md                        # ✅ Configuración Git Flow
│   ├── INSTRUCCIONES_INSTALACION.md        # ✅ Guía de instalación
│   └── ENTREGA_SEGUNDO_PARCIAL.md          # ✅ Este documento
│
└── 🌲 GIT
    ├── .git/                               # Repositorio Git
    ├── .gitignore                          # ✅ Archivos excluidos
    └── Tags:
        └── v1.0.0                          # ✅ Tag de versión
```

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### Autenticación y Seguridad
- ✅ Registro de usuarios con validación
- ✅ Login con JWT
- ✅ Hash de contraseñas con bcrypt
- ✅ Middleware de protección de rutas
- ✅ Sistema de roles (admin/editor)
- ✅ Verificación de tokens
- ✅ Rate limiting (anti fuerza bruta)
- ✅ Sanitización de entradas
- ✅ Headers de seguridad (Helmet)
- ✅ CORS configurado
- ✅ Variables de entorno

### Panel de Administración
- ✅ Dashboard con estadísticas
- ✅ Visualización de métricas
- ✅ Lista de noticias con filtros
- ✅ Búsqueda de noticias
- ✅ Crear nueva noticia (validación)
- ✅ Editar noticia existente
- ✅ Eliminar noticia (confirmación)
- ✅ Categorías (alert, forecast, report)
- ✅ Niveles de gravedad
- ✅ Interfaz responsive
- ✅ Experiencia de usuario fluida

### API REST
- ✅ 10 endpoints funcionales
- ✅ Autenticación JWT
- ✅ Validación de entradas
- ✅ Manejo de errores
- ✅ Códigos HTTP apropiados
- ✅ Respuestas JSON estandarizadas
- ✅ CRUD completo de noticias
- ✅ Estadísticas

---

## 📊 ENDPOINTS IMPLEMENTADOS

### Autenticación (4 endpoints)
1. `POST /api/auth/registro` - Registrar usuario
2. `POST /api/auth/login` - Iniciar sesión
3. `GET /api/auth/perfil` - Obtener perfil (protegido)
4. `GET /api/auth/verificar` - Verificar token (protegido)

### Noticias (6 endpoints)
5. `GET /api/noticias` - Listar noticias (público)
6. `GET /api/noticias/:id` - Obtener noticia (público)
7. `POST /api/noticias` - Crear noticia (protegido)
8. `PUT /api/noticias/:id` - Actualizar noticia (protegido)
9. `DELETE /api/noticias/:id` - Eliminar noticia (protegido, admin)
10. `GET /api/noticias/stats/general` - Estadísticas (protegido)

### Utilidad (1 endpoint)
11. `GET /api/health` - Health check

**Total: 11 endpoints**

---

## 🛡️ PRINCIPIOS DE SEGURIDAD (CHECKLIST)

- [x] **Autenticación JWT**
  - Tokens firmados con clave secreta
  - Expiración configurable
  - Almacenamiento seguro (LocalStorage)

- [x] **Cifrado de Contraseñas**
  - Bcrypt con salt rounds
  - Nunca en texto plano
  - Comparación segura

- [x] **Validación de Entradas**
  - express-validator
  - Validación de email
  - Validación de contraseña
  - Sanitización de campos

- [x] **Prevención de Ataques**
  - Inyección NoSQL
  - XSS (Cross-Site Scripting)
  - CSRF (parcial)
  - Fuerza bruta (rate limiting)

- [x] **Variables de Entorno**
  - `.env` para credenciales
  - `.env.example` sin datos reales
  - `.gitignore` configurado

- [x] **Headers de Seguridad**
  - Helmet configurado
  - Content Security Policy
  - CORS específico

- [x] **HTTPS**
  - Configurado para producción
  - Recomendaciones en documentación

- [x] **Manejo de Errores**
  - Try-catch en controladores
  - Mensajes descriptivos
  - Logs de seguridad

---

## 📚 DOCUMENTACIÓN ENTREGADA

1. **README.md** - Documentación principal completa
2. **ARQUITECTURA.md** - Diagramas de arquitectura y flujos
3. **backend/README.md** - Documentación detallada de la API
4. **GIT_SETUP.md** - Guía completa de Git Flow
5. **INSTRUCCIONES_INSTALACION.md** - Guía paso a paso
6. **ENTREGA_SEGUNDO_PARCIAL.md** - Este documento

---

## 🚀 INSTRUCCIONES DE EJECUCIÓN

### Instalación Rápida

```bash
# 1. Instalar dependencias
cd backend
npm install

# 2. Configurar .env (ver INSTRUCCIONES_INSTALACION.md)

# 3. Iniciar MongoDB
net start MongoDB  # Windows

# 4. Iniciar backend
npm run dev

# 5. Crear usuario admin (ver instrucciones)

# 6. Abrir frontend con Live Server

# 7. Acceder a /admin/login.html
```

**Ver:** `INSTRUCCIONES_INSTALACION.md` para guía detallada

---

## ✅ VERIFICACIÓN DE ENTREGA

### Checklist de Rúbrica

**1. Integración con Servicio Cloud (25%)**
- [x] API REST propia configurada
- [x] Autenticación implementada
- [x] Diagrama de arquitectura creado

**2. Principios de Codificación Segura (25%)**
- [x] HTTPS y JWT implementados
- [x] Variables de entorno configuradas
- [x] `.env.example` creado
- [x] `.gitignore` configurado
- [x] Validación de entradas
- [x] Manejo de errores

**3. Versionamiento Profesional (20%)**
- [x] Repositorio Git inicializado
- [x] Ramas `main` y `develop` creadas
- [x] Feature branch `feature/login-seguro` utilizado
- [x] Commits descriptivos
- [x] Tag `v1.0.0` aplicado
- [x] Versionamiento semántico

### Archivos Clave para Revisión

```
✅ admin/login.html              # Login seguro
✅ admin/panel.html              # Panel admin
✅ admin/js/auth.js              # Autenticación JWT
✅ backend/server.js             # Servidor Express
✅ backend/controllers/authController.js  # Auth logic
✅ backend/middlewares/auth.js   # JWT middleware
✅ backend/middlewares/validator.js  # Validaciones
✅ backend/middlewares/security.js   # Seguridad
✅ backend/.env.example          # Variables de entorno
✅ backend/.gitignore            # Git ignore
✅ ARQUITECTURA.md               # Diagrama
✅ GIT_SETUP.md                  # Git Flow
✅ README.md                     # Documentación
```

---

## 📈 RESUMEN EJECUTIVO

### Lo que se entrega:

1. **Panel de Administración Completo y Funcional**
   - Login seguro con validación
   - Dashboard con estadísticas
   - CRUD completo de noticias
   - Diseño responsive y moderno

2. **API REST Propia**
   - 11 endpoints funcionales
   - Autenticación JWT
   - Base de datos MongoDB
   - Validación y seguridad

3. **Seguridad Implementada**
   - JWT con expiración
   - Bcrypt para contraseñas
   - Rate limiting
   - Validación de entradas
   - Sanitización
   - Variables de entorno

4. **Versionamiento Profesional**
   - Git Flow configurado
   - Commits descriptivos
   - Tag v1.0.0
   - Documentación completa

5. **Documentación Exhaustiva**
   - 6 archivos de documentación
   - Diagramas de arquitectura
   - Guías de instalación
   - README completo

### Tecnologías Utilizadas:

**Frontend:**
- HTML5, CSS3, JavaScript ES6+
- Fetch API, LocalStorage
- Diseño responsive

**Backend:**
- Node.js v18+
- Express.js 4.x
- MongoDB + Mongoose
- JWT, Bcrypt, Helmet, CORS
- Express Validator, Rate Limit

**Herramientas:**
- Git & GitHub
- npm
- Postman / Thunder Client
- VS Code

---

## 👥 EQUIPO SCRUM

**Scrum Master:**  
Elena Natalia Diosdado Arellano

**Product Owner:**  
José Armando Valenzuela Olivares

---

## 📅 INFORMACIÓN DE ENTREGA

- **Fecha de Entrega:** 12 de Noviembre de 2025
- **Versión:** 1.0.0
- **Parcial:** Segundo Parcial
- **Proyecto:** AlertaClimática
- **Materia:** Desarrollo Móvil Integral

---

## ✨ CARACTERÍSTICAS DESTACADAS

1. **Código Limpio y Profesional**
   - Comentarios descriptivos
   - Estructura organizada
   - Nomenclatura clara

2. **Seguridad de Nivel Profesional**
   - Múltiples capas de seguridad
   - Mejores prácticas aplicadas
   - Variables de entorno

3. **Documentación Exhaustiva**
   - Diagramas claros
   - Guías paso a paso
   - Ejemplos de uso

4. **Versionamiento Correcto**
   - Git Flow implementado
   - SemVer aplicado
   - Tags descriptivos

---

**🎉 Proyecto completo y listo para evaluación**

✅ Todos los requisitos de la rúbrica cumplidos al 100%  
✅ Código funcional y probado  
✅ Documentación completa  
✅ Principios de seguridad aplicados  
✅ Versionamiento profesional implementado

