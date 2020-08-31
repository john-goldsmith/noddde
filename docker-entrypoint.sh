#! /bin/sh

set -e

# echo "Creating database..."
# npx sequelize db:create
# echo "Done."

# echo "Migrating database..."
# npx sequelize db:migrate
# echo "Done."

# Uncomment the following if you'd like the database to always be seeded.
# Never do this in production environments!
# echo "Seeding database..."
# npx sequelize db:seed:all
# echo "Done."

exec "$@"
