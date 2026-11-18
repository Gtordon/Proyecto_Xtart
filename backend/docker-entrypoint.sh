#!/bin/sh
# Arranque del backend dentro del contenedor.
set -e

# El .env del contenedor sale del ejemplo, con los datos de la base de datos de docker-compose.yml
if [ ! -f .env ]; then
  cp .env.example .env
fi
sed -i "s|^DB_HOST=.*|DB_HOST=${DB_HOST:-db}|" .env
sed -i "s|^DB_PORT=.*|DB_PORT=${DB_PORT:-3306}|" .env
sed -i "s|^DB_DATABASE=.*|DB_DATABASE=${DB_DATABASE:-sabitech}|" .env
sed -i "s|^DB_USERNAME=.*|DB_USERNAME=${DB_USERNAME:-root}|" .env
sed -i "s|^DB_PASSWORD=.*|DB_PASSWORD=${DB_PASSWORD}|" .env

# Clave de la aplicación: solo la primera vez
if ! grep -q '^APP_KEY=base64:' .env; then
  php artisan key:generate --force
fi

# Tablas y datos de prueba. El seeder usa firstOrCreate, así que no duplica nada al reiniciar.
until php artisan migrate --force; do
  echo "MySQL todavía no está listo, se reintenta en 3 segundos..."
  sleep 3
done
php artisan db:seed --force

exec php artisan serve --host=0.0.0.0 --port=8000
