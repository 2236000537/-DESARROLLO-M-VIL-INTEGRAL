# 📦 Instrucciones de Instalación - AlertaClimática

## Guía Paso a Paso para Configurar el Proyecto

### ✅ Checklist Inicial

Antes de comenzar, asegúrate de tener instalado:

- [ ] Node.js v18 o superior - [Descargar aquí](https://nodejs.org/)
- [ ] MongoDB - [Descargar aquí](https://www.mongodb.com/try/download/community)
- [ ] Git - [Descargar aquí](https://git-scm.com/)
- [ ] Editor de código (VS Code recomendado)

---

## 🚀 INSTALACIÓN RÁPIDA

### Paso 1: Instalar Dependencias del Backend

```bash
# Abrir terminal en la carpeta raíz del proyecto
cd backend
npm install
```

**Esto instalará:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- helmet
- express-validator
- express-rate-limit
- morgan

### Paso 2: Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
# Configuración del servidor
PORT=5000
NODE_ENV=development

# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/alertaclimatica

# JWT Secret (¡CAMBIA ESTO!)
JWT_SECRET=alertaclimatica_secret_2024_super_segura_cambiar
JWT_EXPIRE=24h

# CORS - Dominios permitidos
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:5500,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**⚠️ IMPORTANTE**: Cambia `JWT_SECRET` por una clave única y segura.

### Paso 3: Iniciar MongoDB

**En Windows:**
```bash
net start MongoDB
```

**En Mac/Linux:**
```bash
sudo systemctl start mongod
```

**O usa MongoDB Atlas (Cloud):**
1. Crea cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén la URL de conexión
4. Reemplaza `MONGODB_URI` en `.env`

### Paso 4: Iniciar el Backend

```bash
# Desde la carpeta backend/
npm run dev
```

Deberías ver:
```
🚀 Servidor corriendo en modo development
📡 Puerto: 5000
🔗 URL: http://localhost:5000
✅ MongoDB conectado: localhost:27017
```

### Paso 5: Crear Usuario Administrador

Abre Postman, Thunder Client o usa cURL:

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

**Respuesta esperada:**
```json
{
  "success": true,
  "mensaje": "Usuario registrado exitosamente",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR...",
    "usuario": {
      "id": "...",
      "nombre": "José Valenzuela",
      "email": "admin@alertaclimatica.com",
      "rol": "admin"
    }
  }
}
```

### Paso 6: Abrir el Frontend

**Opción A: Live Server (VS Code)**
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"
4. Se abrirá en `http://127.0.0.1:5500`

**Opción B: Python SimpleHTTPServer**
```bash
# Python 3
python -m http.server 8000

# Abrir: http://localhost:8000
```

### Paso 7: Acceder al Panel de Administración

1. Ve a: `http://127.0.0.1:5500/admin/login.html`
2. Ingresa las credenciales que creaste
3. ¡Listo! Ya estás en el panel

---

## 🔐 CONFIGURACIÓN DE SEGURIDAD

### Actualizar URL de la API

Si tu frontend corre en un puerto diferente, actualiza la URL en:

**Archivo:** `admin/js/config.js`

```javascript
const CONFIG = {
  API_URL: 'http://localhost:5000/api',  // ← Actualiza aquí si es necesario
  // ...
};
```

### Configurar CORS

Si necesitas permitir otros dominios, actualiza en `backend/.env`:

```env
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:5500,TU_DOMINIO_AQUI
```

---

## 🌲 CONFIGURACIÓN DE GIT

### Inicializar Repositorio

```bash
# Inicializar Git (si no está)
git init

# Verificar que .gitignore está configurado
cat .gitignore

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Add: Primera versión de AlertaClimática v1.0.0"

# Crear rama develop
git branch develop

# Crear tag de versión
git tag -a v1.0.0 -m "Versión 1.0.0 - Primera versión estable"
```

### Subir a GitHub

```bash
# Crear repositorio en GitHub primero

# Agregar remoto
git remote add origin https://github.com/TU-USUARIO/alertaclimatica.git

# Push
git push -u origin main
git push origin develop
git push --tags
```

Ver [`GIT_SETUP.md`](GIT_SETUP.md) para más detalles.

---

## 🧪 PRUEBAS DE LA API

### 1. Health Check

```bash
GET http://localhost:5000/api/health
```

**Respuesta:**
```json
{
  "success": true,
  "mensaje": "🌦️ API AlertaClimática funcionando correctamente",
  "version": "1.0.0"
}
```

### 2. Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@alertaclimatica.com",
  "password": "admin123"
}
```

### 3. Obtener Noticias (Público)

```bash
GET http://localhost:5000/api/noticias
```

### 4. Crear Noticia (Requiere Token)

```bash
POST http://localhost:5000/api/noticias
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "titulo": "Alerta de tormenta en Chihuahua",
  "contenido": "Se espera tormenta eléctrica esta noche...",
  "categoria": "alert",
  "ciudad": "Chihuahua",
  "gravedad": "alta"
}
```

---

## ❌ SOLUCIÓN DE PROBLEMAS

### Error: "Cannot connect to MongoDB"

**Solución:**
1. Verifica que MongoDB esté corriendo: `mongo --version`
2. Inicia el servicio: `net start MongoDB` (Windows)
3. O usa MongoDB Atlas (cloud)

### Error: "EADDRINUSE: Port 5000 already in use"

**Solución:**
1. Cambia el puerto en `backend/.env`:
   ```env
   PORT=5001
   ```
2. O cierra la aplicación que usa el puerto 5000

### Error: "CORS policy blocked"

**Solución:**
1. Verifica que el origen esté en `ALLOWED_ORIGINS` del `.env`
2. Reinicia el backend después de cambiar `.env`

### Error: "Token inválido"

**Solución:**
1. Verifica que el token no haya expirado
2. Haz login nuevamente
3. Verifica que `JWT_SECRET` sea el mismo en `.env`

### Frontend no carga

**Solución:**
1. Verifica que el servidor HTTP esté corriendo
2. Abre la consola del navegador (F12) para ver errores
3. Verifica la URL de la API en `admin/js/config.js`

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
alertaclimatica/
├── admin/                    # Panel de administración
│   ├── login.html           # Página de login
│   ├── panel.html           # Dashboard admin
│   ├── css/                 # Estilos del panel
│   │   ├── login.css
│   │   └── panel.css
│   └── js/                  # Lógica del panel
│       ├── config.js        # ← Configurar URL aquí
│       ├── auth.js
│       ├── login.js
│       └── panel.js
│
├── backend/                 # API REST
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noticiaController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Noticia.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noticiaRoutes.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── validator.js
│   │   └── security.js
│   ├── .env                 # ← Configurar aquí
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── mapa/                    # Páginas públicas
│   ├── mapa.html
│   ├── noticias.html
│   ├── foro.html
│   ├── css/
│   └── js/
│
├── index.html               # Página principal
├── README.md                # Documentación principal
├── ARQUITECTURA.md          # Diagrama de arquitectura
├── GIT_SETUP.md             # Configuración de Git
└── INSTRUCCIONES_INSTALACION.md  # Este archivo
```

---

## ✅ CHECKLIST DE INSTALACIÓN

- [ ] Node.js instalado
- [ ] MongoDB instalado o Atlas configurado
- [ ] Dependencias del backend instaladas (`npm install`)
- [ ] Archivo `.env` creado y configurado
- [ ] MongoDB corriendo
- [ ] Backend iniciado (`npm run dev`)
- [ ] Usuario administrador creado
- [ ] Frontend abierto con Live Server o Python
- [ ] Login exitoso en el panel
- [ ] Git inicializado y configurado
- [ ] Tag v1.0.0 creado
- [ ] Repositorio subido a GitHub

---

## 📞 SOPORTE

Si tienes problemas:

1. Revisa la consola del backend para errores
2. Revisa la consola del navegador (F12) para errores del frontend
3. Verifica que todas las URLs y puertos sean correctos
4. Consulta [`backend/README.md`](backend/README.md) para más detalles de la API

---

## 🎉 ¡LISTO!

Tu aplicación AlertaClimática está completamente configurada con:

✅ Panel de administración seguro  
✅ Autenticación JWT  
✅ API REST propia  
✅ Base de datos MongoDB  
✅ Principios de codificación segura  
✅ Versionamiento profesional  
✅ Git Flow configurado  

**¡Ahora puedes gestionar las noticias climáticas de forma segura!** 🌦️

