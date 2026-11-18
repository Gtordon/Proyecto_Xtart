# SABITECH WEB

Proyecto Intermodular 2.º DAW · Joan, Guillermo y Alberto

Aplicación web para consultar las charlas de un evento tecnológico y reservar plaza. Desarrollada para la empresa ficticia Umbral Labs SL.

| Parte | Tecnología | Carpeta |
|---|---|---|
| Backend (API) | Laravel 12 · PHP 8.3 · MySQL 8.4 | `backend/` |
| Frontend | React 19 · Vite | `frontend/` |
| Documentación | Markdown | `docs/` |

## Requisitos

- PHP 8.3 y Composer
- Node.js 24 y npm
- MySQL 8.4, instalado con Homebrew o con Docker (solo una de las dos opciones)
- Git

## Instalación desde cero

### 1. Clonar

```bash
git clone https://github.com/Gtordon/Proyecto_Xtart.git sabitech-web
cd sabitech-web
```

### 2. Base de datos

Elige **una** opción. Las dos usan el puerto 3306, así que no las tengas encendidas a la vez.

**Opción A: Docker**

Desde la carpeta del proyecto, donde está el archivo docker-compose.yml, arranca solo la base de datos:
```bash
docker compose up -d db
```

Crea la base de datos `sabitech` con el usuario `root` y la contraseña `admin123`, que son los valores de `backend/.env.example`.

**Opción B: MySQL con Homebrew (macOS)**

```bash
brew install mysql@8.4
brew services start mysql@8.4
"$(brew --prefix mysql@8.4)/bin/mysql" -u root -e "CREATE DATABASE sabitech; CREATE USER 'sabitech'@'localhost' IDENTIFIED BY 'una_contraseña'; GRANT ALL ON sabitech.* TO 'sabitech'@'localhost';"
```

En el paso 3, después de crear el archivo backend/.env y antes de ejecutar las migraciones, pon DB_USERNAME=sabitech y DB_PASSWORD con la misma contraseña que usaste al crear el usuario de MySQL.

### 3. Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

La API queda en `http://127.0.0.1:8000/api`. Comprueba que responde con `curl http://127.0.0.1:8000/api/talks`.

### 4. Frontend

Abre otra terminal y desde la carpeta del proyecto, ejecuta esto:

```bash
cd frontend
npm ci
npm run dev
```

Abre `http://localhost:5173`.

### Instalación en Windows (PowerShell)

1. Instala Git, PHP 8.3 con la extensión `pdo_mysql` habilitada, Composer y Node.js 24 con npm. Comprueba que estén disponibles desde PowerShell.
2. Instala y abre [Docker Desktop para Windows](https://docs.docker.com/desktop/setup/install/windows-install/) con el motor WSL 2. Clona el repositorio como en el paso 1 y usa la opción A del paso 2 para arrancar MySQL.
3. Sigue los comandos del paso 3. Para copiar el archivo de configuración, usa `Copy-Item .env.example .env` desde `backend`. Comprueba que la API responde abriendo `http://127.0.0.1:8000/api/talks` en el navegador.
4. Mantén el backend en marcha y abre otra ventana de PowerShell en la carpeta del proyecto. Sigue el paso 4 y abre `http://localhost:5173`.

Para ejecutar las comprobaciones del apartado Pruebas en PowerShell, usa `php artisan test` desde `backend` con `pdo_sqlite` habilitado. Desde `frontend`, ejecuta `npm run lint` y `npm run build` en líneas separadas.

## Arrancar todo con Docker

Con Docker Desktop encendido, desde la carpeta del proyecto:

```bash
docker compose up -d --build
```

Levanta tres contenedores:

| Contenedor | Qué hace | Dirección |
|---|---|---|
| `sabitech-db` | MySQL 8.4 con la base de datos `sabitech` | puerto 3306 |
| `sabitech-backend` | Laravel (PHP 8.3). Al arrancar crea las tablas y carga los datos de prueba | `http://localhost:8000/api` |
| `sabitech-frontend` | Nginx con la web compilada; reenvía `/api` al backend | `http://localhost:8080` |

La primera vez tarda unos minutos porque descarga las imágenes e instala las dependencias. Para ver qué está pasando: `docker compose logs -f backend`. Para pararlo: `docker compose down` (los datos se guardan en el volumen `db_data`; `docker compose down -v` los borra).

No lo tengas encendido a la vez que `php artisan serve` o MySQL local: usan los mismos puertos (8000 y 3306).

## Cuentas de prueba

Solo existen en los entornos `local` y `testing`. Contraseña de todas: `password`.

| Correo | Perfil |
|---|---|
| ana@sabitech.test | Asistente (ya tiene reservas) |
| alex@sabitech.test | Asistente |
| carla@sabitech.test | Asistente sin reservas |
| organizacion@sabitech.test | Organizador |
| acceso@sabitech.test | Personal de acceso |

Las tres charlas de prueba se programan para el mismo día, siete días después de cargar los datos de prueba. Una tiene capacidad para 100 personas, otra tiene una plaza libre y la tercera está completa.

## Pruebas

```bash
(cd backend && php artisan test)
(cd frontend && npm run lint && npm run build)
```

Las pruebas del backend usan SQLite en memoria y no tocan tu base de datos. GitHub Actions las ejecuta en cada pull request (`.github/workflows/ci.yml`).

## Problemas frecuentes

| Síntoma | Causa y solución |
|---|---|
| La web dice "No se pudo conectar con el servidor" | El backend no está encendido: `php artisan serve` en `backend/`. |
| `Access denied for user ...` | Comprueba que `DB_USERNAME` y `DB_PASSWORD` en `backend/.env` coinciden con las credenciales del MySQL que usas. Si elegiste Homebrew y el contenedor de MySQL está activo, detenlo para liberar el puerto `3306`. |
| Las horas salen una hora más tarde | Configuración antigua en caché: `php artisan config:clear`. |
| Cambié un usuario en el seeder y el cambio no se aplica | El seeder conserva los usuarios existentes. Si quieres recrear los datos de prueba, usa `php artisan migrate:fresh --seed` solo en una base de datos local que puedas borrar por completo. El comando elimina todas las tablas, incluidas las reservas. |

## Documentación

- [Requisitos](docs/requisitos.md)
- [Pantallas](docs/pantallas.md)
- [Contrato de la API](docs/api.md)
- [Modelo de datos](docs/modelo-datos.md)
- [Empresa: Umbral Labs SL](docs/empresa.md)
- [Registro de uso de IA](docs/registro-ia.md)

## Forma de trabajo

Cada cambio va en una rama propia y entra en `main` mediante pull request revisada por otro miembro del grupo. No se sube nada directamente a `main`.
