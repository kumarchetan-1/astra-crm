#!/usr/bin/env bash
set -e

# Usage: called in db-init container with psql available and env DATABASE_URL or PGHOST/PGUSER/PGPASSWORD/PGDATABASE
# This script waits for postgres to come up and runs INITIAL_DB_SQL if set, else falls back to seed.sql

echo "[init-db] Waiting for Postgres..."
# parse DATABASE_URL if provided
if [ -n "$DATABASE_URL" ]; then
  # export PG* variables for psql
  # DATABASE_URL format: postgres://user:pass@host:port/dbname
  # Bash regex doesn't support named groups, so we use positional groups
  regex="postgres(ql)?://([^:]+):([^@]+)@([^:]+):([0-9]+)/(.+)"
  if [[ $DATABASE_URL =~ $regex ]]; then
    export PGUSER="${BASH_REMATCH[2]}"
    export PGPASSWORD="${BASH_REMATCH[3]}"
    export PGHOST="${BASH_REMATCH[4]}"
    export PGPORT="${BASH_REMATCH[5]}"
    export PGDATABASE="${BASH_REMATCH[6]}"
  fi
fi

# wait loop
for i in {1..60}; do
  if psql -c "\l" > /dev/null 2>&1; then
    echo "[init-db] Postgres is up"
    break
  fi
  echo "[init-db] waiting... ($i)"
  sleep 1
done

if [ -n "$INITIAL_DB_SQL" ]; then
  echo "[init-db] Running INITIAL_DB_SQL"
  echo "$INITIAL_DB_SQL" | psql
else
  echo "[init-db] Running fallback seed.sql"
  psql -f /workspace/packages/db/seed.sql
fi

echo "[init-db] Done."
