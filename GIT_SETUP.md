# 🌲 Configuración de Git Flow - AlertaClimática

## Instrucciones para Configurar el Repositorio

### 1. Inicializar Git (si no está inicializado)

```bash
git init
```

### 2. Configurar .gitignore

El archivo `.gitignore` ya está configurado en el proyecto. Asegúrate de que incluya:

```
# Backend
backend/node_modules/
backend/.env
backend/logs/
backend/*.log

# Sistema
.DS_Store
Thumbs.db
*.swp

# IDEs
.vscode/
.idea/
```

### 3. Crear Rama Principal y Develop

```bash
# Asegurarte de estar en main
git branch -M main

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Add: Primera versión de AlertaClimática v1.0.0

- Panel de administración seguro
- Autenticación JWT con API REST propia
- CRUD de noticias
- Principios de codificación segura
- Validación de entradas
- Rate limiting y protección
- Variables de entorno
- Documentación completa"

# Crear rama develop
git branch develop

# Ver ramas creadas
git branch
```

### 4. Crear Feature Branch (login-seguro)

```bash
# Cambiar a develop
git checkout develop

# Crear y cambiar a feature branch
git checkout -b feature/login-seguro

# Hacer cambios...
# (ya están hechos en este caso)

# Agregar cambios
git add .

# Commit de la feature
git commit -m "Add: Sistema de login seguro

- Implementación de autenticación JWT
- Formulario de login con validación
- Middleware de protección de rutas
- Bcrypt para hash de contraseñas
- Rate limiting en login
- Variables de entorno para seguridad"

# Volver a develop
git checkout develop

# Merge de la feature
git merge feature/login-seguro

# Opcional: Eliminar feature branch
git branch -d feature/login-seguro
```

### 5. Merge a Main y Crear Tag

```bash
# Cambiar a main
git checkout main

# Merge desde develop
git merge develop

# Crear tag de versión v1.0.0
git tag -a v1.0.0 -m "Versión 1.0.0 - Primera versión estable

Características:
- Panel de administración seguro
- Autenticación JWT
- API REST con Node.js + Express + MongoDB
- CRUD completo de noticias
- Principios de codificación segura
- Validación y sanitización
- Rate limiting
- Variables de entorno
- Documentación completa
- Git flow configurado

Roles Scrum:
- Scrum Master: Elena Natalia Diosdado Arellano
- Product Owner: José Armando Valenzuela Olivares"

# Ver tags
git tag

# Ver detalles del tag
git show v1.0.0
```

### 6. Conectar con GitHub

```bash
# Agregar repositorio remoto
git remote add origin https://github.com/TU-USUARIO/alertaclimatica.git

# Verificar remoto
git remote -v

# Push main
git push -u origin main

# Push develop
git push -u origin develop

# Push tags
git push origin v1.0.0

# O push de todos los tags
git push --tags
```

## Estructura de Ramas Recomendada

```
main (producción)
  │
  ├── v1.0.0 (tag)
  │
  └── develop (desarrollo)
        │
        ├── feature/login-seguro ✅
        ├── feature/crud-noticias ✅
        ├── feature/dashboard ✅
        │
        └── feature/nuevas-features (futuras)
```

## Flujo de Trabajo Git Flow

### Para Nuevas Características

```bash
# 1. Crear feature desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nombre-feature

# 2. Desarrollar la feature...
git add .
git commit -m "Add: descripción de la feature"

# 3. Finalizar feature
git checkout develop
git merge feature/nombre-feature
git push origin develop

# 4. Eliminar feature branch (opcional)
git branch -d feature/nombre-feature
```

### Para Release

```bash
# 1. Crear rama release desde develop
git checkout develop
git checkout -b release/1.1.0

# 2. Hacer ajustes finales y testing
git add .
git commit -m "Update: Preparar release 1.1.0"

# 3. Merge a main
git checkout main
git merge release/1.1.0

# 4. Crear tag
git tag -a v1.1.0 -m "Versión 1.1.0"

# 5. Merge a develop
git checkout develop
git merge release/1.1.0

# 6. Push todo
git push origin main
git push origin develop
git push origin v1.1.0

# 7. Eliminar release branch
git branch -d release/1.1.0
```

### Para Hotfixes (Correcciones Urgentes)

```bash
# 1. Crear hotfix desde main
git checkout main
git checkout -b hotfix/correccion-critica

# 2. Corregir el bug
git add .
git commit -m "Fix: descripción de la corrección"

# 3. Merge a main
git checkout main
git merge hotfix/correccion-critica

# 4. Crear tag (incrementar PATCH)
git tag -a v1.0.1 -m "Versión 1.0.1 - Hotfix"

# 5. Merge a develop también
git checkout develop
git merge hotfix/correccion-critica

# 6. Push todo
git push origin main
git push origin develop
git push origin v1.0.1

# 7. Eliminar hotfix branch
git branch -d hotfix/correccion-critica
```

## Convenciones de Commits

### Formato
```
<tipo>: <descripción corta>

<descripción detallada (opcional)>

<footer (opcional)>
```

### Tipos de Commits

- **Add:** Nueva funcionalidad
- **Fix:** Corrección de bug
- **Update:** Actualización de funcionalidad existente
- **Remove:** Eliminación de código/funcionalidad
- **Docs:** Cambios en documentación
- **Style:** Cambios de formato (sin cambiar lógica)
- **Refactor:** Refactorización de código
- **Test:** Agregar o modificar tests
- **Chore:** Tareas de mantenimiento

### Ejemplos

```bash
# Bueno
git commit -m "Add: Autenticación JWT en backend"

git commit -m "Fix: Validación de email en formulario de registro

Corrige bug que permitía emails inválidos.
Agrega regex más robusto."

# Malo
git commit -m "cambios"
git commit -m "fix bug"
git commit -m "actualizacion"
```

## Versionamiento Semántico (SemVer)

```
MAJOR.MINOR.PATCH

Ejemplo: 1.2.3
         │ │ │
         │ │ └─ PATCH: Correcciones de bugs (1.2.3 → 1.2.4)
         │ └─── MINOR: Nuevas funcionalidades compatibles (1.2.3 → 1.3.0)
         └───── MAJOR: Cambios incompatibles (1.2.3 → 2.0.0)
```

### Cuándo Incrementar

- **MAJOR (1.0.0 → 2.0.0)**: Cambios que rompen compatibilidad
- **MINOR (1.0.0 → 1.1.0)**: Nuevas funcionalidades compatibles
- **PATCH (1.0.0 → 1.0.1)**: Correcciones de bugs

## Comandos Git Útiles

```bash
# Ver estado
git status

# Ver historial
git log --oneline --graph --all

# Ver ramas
git branch -a

# Ver tags
git tag -l

# Ver cambios
git diff

# Deshacer último commit (sin perder cambios)
git reset --soft HEAD~1

# Ver remoto
git remote -v

# Actualizar desde remoto
git pull origin main

# Ver archivos ignorados
git status --ignored
```

## Archivo .gitignore Completo

```gitignore
# Dependencias
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json

# Variables de entorno
.env
.env.local
.env.production

# Logs
logs/
*.log

# Base de datos local
*.db
*.sqlite

# Sistema operativo
.DS_Store
Thumbs.db
desktop.ini

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~
.project
.classpath
.settings/

# Archivos temporales
tmp/
temp/
*.tmp

# Build
dist/
build/
.cache/

# Testing
coverage/
.nyc_output/

# Específico del proyecto
backend/node_modules/
backend/.env
backend/logs/
```

## Checklist de Configuración

- [ ] Git inicializado
- [ ] Rama `main` creada
- [ ] Rama `develop` creada
- [ ] Feature branch `feature/login-seguro` creado y mergeado
- [ ] Commit inicial realizado
- [ ] Tag `v1.0.0` creado
- [ ] Repositorio remoto en GitHub configurado
- [ ] Push a GitHub realizado
- [ ] `.gitignore` configurado correctamente
- [ ] README.md actualizado
- [ ] Documentación completa

## Recursos Adicionales

- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Documentation](https://git-scm.com/doc)

---

✅ **Configuración completada - Proyecto listo para versionamiento profesional**

