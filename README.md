# 🌦️ AlertaClimática - Plataforma de Información Climática

> Plataforma web informativa que centraliza datos e información sobre el impacto climático con panel de administración seguro.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Descripción

AlertaClimática es una plataforma web desarrollada con HTML, CSS, JavaScript y Bootstrap que proporciona información actualizada sobre el clima, noticias meteorológicas, alertas y pronósticos. El proyecto incluye un **panel de administración seguro** con autenticación JWT y una API REST propia construida con Node.js, Express y MongoDB.

## ✨ Características Principales

### Plataforma Pública
- 🌤️ **Información del Clima en Tiempo Real**
- 📰 **Noticias y Alertas Meteorológicas**
- 🗺️ **Mapa Interactivo del Clima**
- 💬 **Foro de Discusión**
- 📱 **Diseño Responsive**

### Panel de Administración
- 🔐 **Autenticación Segura con JWT**
- 📊 **Dashboard con Estadísticas**
- ✏️ **Gestión de Noticias (CRUD Completo)**
- 👥 **Sistema de Roles (Admin/Editor)**
- 🛡️ **Principios de Codificación Segura**

## 🏗️ Arquitectura

**Patrón**: MVC (Modelo-Vista-Controlador)  
**Metodología**: Scrum

```
📦 AlertaClimática
├── 🎨 Frontend (HTML/CSS/JS)
│   ├── index.html          # Página principal
│   ├── mapa/               # Módulos de la app
│   └── admin/              # Panel de administración
│       ├── login.html      # Login seguro
│       ├── panel.html      # Dashboard admin
│       ├── css/            # Estilos
│       └── js/             # Lógica frontend
│
├── 🔧 Backend (Node.js + Express)
│   ├── config/             # Configuración
│   ├── controllers/        # Lógica de negocio
│   ├── models/             # Modelos MongoDB
│   ├── routes/             # Rutas API
│   ├── middlewares/        # Auth, validación, seguridad
│   └── server.js           # Servidor Express
│
└── 📄 Documentación
    ├── README.md           # Este archivo
    ├── ARQUITECTURA.md     # Diagrama de arquitectura
    └── backend/README.md   # Documentación del backend
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js v18 o superior
- MongoDB (local o Atlas)
- Git

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/alertaclimatica.git
cd alertaclimatica
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend/`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/alertaclimatica
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRE=24h
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:5500
```

### 3. Iniciar MongoDB

**Opción A: MongoDB Local**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

**Opción B: MongoDB Atlas**
- Crea una cuenta en https://www.mongodb.com/cloud/atlas
- Crea un cluster y obtén la URL de conexión
- Actualiza `MONGODB_URI` en `.env`

### 4. Iniciar el Backend

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

El servidor estará corriendo en `http://localhost:5000`

### 5. Abrir el Frontend

Puedes usar cualquiera de estas opciones:

**Opción A: Live Server (VS Code)**
- Instala la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

**Opción B: Python SimpleHTTPServer**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Luego abre: `http://localhost:8000`

## 🔐 Uso del Panel de Administración

### 1. Crear Usuario Administrador

Usa Postman, Thunder Client o cURL:

```bash
POST http://localhost:5000/api/auth/registro
Content-Type: application/json

{
  "nombre": "José Valenzuela",
  "email": "admin@alertaclimatica.com",
  "password": "admin123",
  "rol": "admin"
}
```

### 2. Acceder al Panel

1. Abre `http://localhost:8000/admin/login.html` (o tu URL del frontend)
2. Ingresa tus credenciales
3. Serás redirigido al panel de administración

### 3. Gestionar Noticias

- **Dashboard**: Visualiza estadísticas generales
- **Gestionar Noticias**: Lista, busca y filtra noticias
- **Crear Noticia**: Agrega nuevas noticias con validación
- **Editar/Eliminar**: Modifica o elimina noticias existentes

## 🛡️ Principios de Seguridad Implementados

### ✅ Autenticación y Autorización
- JWT (JSON Web Tokens) con expiración
- Bcrypt para hash de contraseñas (salt rounds: 10)
- Sistema de roles (admin, editor)
- Middleware de protección de rutas

### ✅ Validación de Entradas
- express-validator en todas las rutas
- Sanitización de datos
- Prevención de inyección NoSQL
- Validación de email, contraseñas y campos

### ✅ Protección contra Ataques
- **Rate Limiting**: Límite de requests por IP
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configurado específicamente
- **NoSQL Injection**: Sanitización de queries

### ✅ Variables de Entorno
- Credenciales en `.env` (nunca en el código)
- `.env.example` como plantilla
- `.gitignore` configurado correctamente

### ✅ HTTPS (Producción)
- Certificados SSL/TLS
- Redirección HTTP → HTTPS
- Cookies seguras

## 📡 API REST Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Iniciar sesión | No |
| POST | `/api/auth/registro` | Registrar usuario | No |
| GET | `/api/auth/perfil` | Obtener perfil | Sí |
| GET | `/api/auth/verificar` | Verificar token | Sí |

### Noticias

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/noticias` | Listar noticias | No |
| GET | `/api/noticias/:id` | Obtener noticia | No |
| POST | `/api/noticias` | Crear noticia | Sí |
| PUT | `/api/noticias/:id` | Actualizar noticia | Sí |
| DELETE | `/api/noticias/:id` | Eliminar noticia | Sí (Admin) |
| GET | `/api/noticias/stats/general` | Estadísticas | Sí |

Ver documentación completa en [`backend/README.md`](backend/README.md)

## 📊 Metodología Scrum

### Roles

- **Scrum Master**: Elena Natalia Diosdado Arellano
- **Product Owner**: José Armando Valenzuela Olivares

### Historias de Usuario Implementadas

- ✅ **HU-04**: Panel de Administración (Login Seguro)
- ✅ Integración con servicio cloud (API REST propia)
- ✅ Autenticación JWT con MongoDB
- ✅ Gestión de noticias (CRUD completo)
- ✅ Principios de codificación segura
- ✅ Validación de entradas y manejo de errores

## 🔄 Versionamiento

Este proyecto sigue **Versionamiento Semántico** (SemVer 2.0.0):

```
MAJOR.MINOR.PATCH

1.0.0 - Primera versión estable
  │ │ │
  │ │ └─ Correcciones de bugs
  │ └─── Nuevas funcionalidades (compatible)
  └───── Cambios incompatibles
```

### Historial de Versiones

- **v1.0.0** (2025-11-12) - Lanzamiento inicial
  - Panel de administración seguro
  - Autenticación JWT
  - API REST propia
  - Gestión de noticias
  - Principios de seguridad implementados

## 🌲 Git Flow

```
main          ← Producción
  │
  ├── develop     ← Desarrollo
  │     │
  │     ├── feature/login-seguro
  │     ├── feature/crud-noticias
  │     └── feature/dashboard
  │
  └── hotfix/*    ← Correcciones urgentes
```

### Comandos Git Útiles

```bash
# Ver ramas
git branch -a

# Cambiar a develop
git checkout develop

# Crear feature branch
git checkout -b feature/nombre-feature

# Merge a develop
git checkout develop
git merge feature/nombre-feature

# Tag de versión
git tag -a v1.0.0 -m "Primera versión estable"
git push origin v1.0.0
```

## 📱 Tecnologías Utilizadas

### Frontend
- HTML5
- CSS3 (Variables CSS, Grid, Flexbox, Animations)
- JavaScript (ES6+)
- Bootstrap 5 (parcial)
- Fetch API
- Local Storage

### Backend
- Node.js v18+
- Express.js 4.x
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcryptjs
- Helmet
- CORS
- Express Validator
- Express Rate Limit
- Morgan (logger)
- Dotenv

### Herramientas
- Git & GitHub
- npm
- Postman / Thunder Client
- VS Code
- MongoDB Compass

## 📝 Scripts Disponibles

### Backend

```bash
npm start       # Iniciar servidor en producción
npm run dev     # Iniciar con nodemon (desarrollo)
```

## 🚧 Próximas Mejoras

- [ ] Refresh tokens
- [ ] Carga de imágenes para noticias
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Tests unitarios y de integración
- [ ] Documentación con Swagger/OpenAPI
- [ ] CI/CD con GitHub Actions
- [ ] Despliegue en producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits

- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bug
- `Update:` Actualización de funcionalidad existente
- `Remove:` Eliminación de código
- `Docs:` Cambios en documentación

## 👥 Equipo

- **José Armando Valenzuela Olivares** - Product Owner
- **Elena Natalia Diosdado Arellano** - Scrum Master

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Proyecto**: AlertaClimática
- **Versión**: 1.0.0
- **Año**: 2025

---

⚡ **Desarrollado con ❤️ por el equipo de AlertaClimática**

