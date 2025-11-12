# ⚡ Inicio Rápido - AlertaClimática

## 🚀 5 Pasos para Ejecutar el Proyecto

### 1️⃣ Instalar Dependencias

```bash
cd backend
npm install
```

### 2️⃣ Configurar Variables de Entorno

Crea el archivo `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/alertaclimatica
JWT_SECRET=alertaclimatica_secret_2024_cambiar_en_produccion
JWT_EXPIRE=24h
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:5500
```

### 3️⃣ Iniciar MongoDB

```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

**O usa MongoDB Atlas (cloud):** https://www.mongodb.com/cloud/atlas

### 4️⃣ Iniciar Backend

```bash
# Desde backend/
npm run dev
```

✅ Deberías ver: `✅ MongoDB conectado` y `🚀 Servidor corriendo`

### 5️⃣ Abrir Frontend

**Opción A: Live Server (VS Code)**
- Click derecho en `index.html` → "Open with Live Server"

**Opción B: Python**
```bash
python -m http.server 8000
```

---

## 🔐 Crear Usuario Admin

Usa Postman o Thunder Client:

```http
POST http://localhost:5000/api/auth/registro
Content-Type: application/json

{
  "nombre": "Admin",
  "email": "admin@alertaclimatica.com",
  "password": "admin123",
  "rol": "admin"
}
```

---

## 🎯 Acceder al Panel

1. Abre: `http://127.0.0.1:5500/admin/login.html`
2. Login con las credenciales creadas
3. ¡Listo! 🎉

---

## 📝 URLs Importantes

- **API Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health
- **Frontend:** http://127.0.0.1:5500 (o tu puerto)
- **Panel Admin:** http://127.0.0.1:5500/admin/login.html

---

## ❌ Problemas Comunes

### "Cannot connect to MongoDB"
→ Verifica que MongoDB esté corriendo: `net start MongoDB`

### "Port 5000 already in use"
→ Cambia el puerto en `backend/.env`: `PORT=5001`

### "CORS policy blocked"
→ Agrega tu origen en `ALLOWED_ORIGINS` del `.env`

---

## 📚 Documentación Completa

- [`README.md`](README.md) - Documentación principal
- [`INSTRUCCIONES_INSTALACION.md`](INSTRUCCIONES_INSTALACION.md) - Guía detallada
- [`ARQUITECTURA.md`](ARQUITECTURA.md) - Diagramas
- [`backend/README.md`](backend/README.md) - API docs

---

**¡Disfruta gestionando el clima! 🌦️**

