# 🌦️ AlertaClimática Backend - API REST

API REST segura para el panel de administración de AlertaClimática, construida con Node.js, Express, MongoDB y JWT.

## 📋 Características

- ✅ Autenticación JWT segura
- ✅ Protección contra ataques de fuerza bruta (Rate Limiting)
- ✅ Validación de entradas
- ✅ Protección contra inyección NoSQL
- ✅ Headers de seguridad con Helmet
- ✅ CORS configurado
- ✅ Cifrado de contraseñas con bcrypt
- ✅ Variables de entorno seguras

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del backend copiando `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/alertaclimatica
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRE=24h
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:5500
```

### 3. Instalar y configurar MongoDB

**Opción A: MongoDB local**
- Instala MongoDB Community Edition desde https://www.mongodb.com/try/download/community
- Inicia el servicio de MongoDB

**Opción B: MongoDB Atlas (Cloud)**
- Crea una cuenta gratuita en https://www.mongodb.com/cloud/atlas
- Crea un cluster y obtén la URL de conexión
- Actualiza `MONGODB_URI` en `.env` con tu URL de Atlas

### 4. Iniciar el servidor

**Modo desarrollo (con nodemon):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará corriendo en `http://localhost:5000`

## 📁 Estructura del Proyecto

```
backend/
├── config/
│   └── database.js          # Configuración de MongoDB
├── controllers/
│   ├── authController.js    # Lógica de autenticación
│   └── noticiaController.js # Lógica de noticias
├── middlewares/
│   ├── auth.js              # Middleware de autenticación JWT
│   ├── validator.js         # Validaciones de entrada
│   └── security.js          # Middlewares de seguridad
├── models/
│   ├── User.js              # Modelo de Usuario
│   └── Noticia.js           # Modelo de Noticia
├── routes/
│   ├── authRoutes.js        # Rutas de autenticación
│   └── noticiaRoutes.js     # Rutas de noticias
├── .env                     # Variables de entorno (NO subir a Git)
├── .env.example             # Ejemplo de variables de entorno
├── .gitignore               # Archivos ignorados por Git
├── package.json             # Dependencias del proyecto
├── server.js                # Punto de entrada de la aplicación
└── README.md                # Este archivo
```

## 🔐 Endpoints de la API

### Autenticación

#### Registrar Usuario
```http
POST /api/auth/registro
Content-Type: application/json

{
  "nombre": "José Valenzuela",
  "email": "jose@example.com",
  "password": "password123",
  "rol": "admin"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "jose@example.com",
  "password": "password123"
}
```

Respuesta:
```json
{
  "success": true,
  "mensaje": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": "123",
      "nombre": "José Valenzuela",
      "email": "jose@example.com",
      "rol": "admin"
    }
  }
}
```

#### Verificar Token
```http
GET /api/auth/verificar
Authorization: Bearer {token}
```

#### Obtener Perfil
```http
GET /api/auth/perfil
Authorization: Bearer {token}
```

### Noticias

#### Obtener todas las noticias (público)
```http
GET /api/noticias?categoria=alert&limit=20&page=1
```

#### Obtener noticia por ID (público)
```http
GET /api/noticias/:id
```

#### Crear noticia (requiere autenticación)
```http
POST /api/noticias
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Alerta de tormenta",
  "contenido": "Se espera tormenta eléctrica...",
  "categoria": "alert",
  "ciudad": "Chihuahua",
  "gravedad": "alta"
}
```

#### Actualizar noticia (requiere autenticación)
```http
PUT /api/noticias/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Título actualizado",
  "contenido": "Contenido actualizado"
}
```

#### Eliminar noticia (requiere rol admin)
```http
DELETE /api/noticias/:id
Authorization: Bearer {token}
```

#### Obtener estadísticas (requiere autenticación)
```http
GET /api/noticias/stats/general
Authorization: Bearer {token}
```

### Health Check
```http
GET /api/health
```

## 🛡️ Principios de Seguridad Implementados

### 1. **Autenticación JWT**
- Tokens con expiración configurable
- Tokens firmados con clave secreta
- Verificación en cada petición protegida

### 2. **Cifrado de Contraseñas**
- Uso de bcrypt con salt rounds
- Contraseñas nunca almacenadas en texto plano

### 3. **Validación de Entradas**
- express-validator para validar datos
- Sanitización de entradas
- Prevención de inyección NoSQL

### 4. **Rate Limiting**
- Límite de intentos de login (5 en 15 minutos)
- Rate limiting general de API (100 requests/15min)

### 5. **Headers de Seguridad**
- Helmet.js configurado
- Content Security Policy
- CORS configurado específicamente

### 6. **Variables de Entorno**
- Credenciales sensibles en `.env`
- `.env` excluido de Git
- `.env.example` como plantilla

### 7. **HTTPS**
- En producción, usar siempre HTTPS
- Configurar certificados SSL/TLS
- Forzar redirección HTTP → HTTPS

## 🧪 Pruebas con Postman/Thunder Client

1. Importa la colección de Postman (próximamente)
2. Configura la variable de entorno `BASE_URL` a `http://localhost:5000`
3. Registra un usuario usando `/api/auth/registro`
4. Haz login y copia el token recibido
5. Usa el token en el header `Authorization: Bearer {token}` para rutas protegidas

## 📊 Scrum - Roles

- **Scrum Master**: Elena Natalia Diosdado Arellano
- **Product Owner**: José Armando Valenzuela Olivares

## 🔄 Versionamiento

Este proyecto sigue **Versionamiento Semántico** (SemVer):
- **v1.0.0** - Primera versión estable con autenticación y gestión de noticias

## 📝 Próximas Mejoras

- [ ] Implementación de refresh tokens
- [ ] Sistema de roles más granular
- [ ] Carga de imágenes para noticias
- [ ] Sistema de notificaciones en tiempo real
- [ ] Tests unitarios y de integración
- [ ] Documentación con Swagger/OpenAPI
- [ ] CI/CD con GitHub Actions
- [ ] Despliegue en producción (Railway, Heroku, AWS, etc.)

## 👥 Contribuidores

- José Armando Valenzuela Olivares (Product Owner)
- Elena Natalia Diosdado Arellano (Scrum Master)

## 📄 Licencia

MIT License - AlertaClimática 2025

