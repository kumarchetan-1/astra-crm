# Astra MVP monorepo (minimal)

This scaffold contains a minimal monorepo with:
- apps/web (Next.js)
- apps/http-backend (Express + Prisma)
- apps/ws-backend (WebSocket server)
- packages/db (Prisma schema & seed)
- packages/common (shared types)
- docker-compose to run services including Postgres

NOTE: For pragmatic compatibility inside Docker this scaffold uses **Node.js** for services.
You can adapt to Bun by replacing Dockerfiles and runtimes.

## Quick start (recommended)
1. Copy `.env.example` to `.env` and adjust values if needed.
2. Build & run with Docker:
```bash
docker compose up --build
```

3. Verify:
- HTTP backend health: `curl http://localhost:4000/api/health`
- Leads: `curl http://localhost:4000/api/leads`
- Open UI: http://localhost:3000

## Seed behaviour
- The `db-init` service runs `scripts/init-db.sh` and will apply `INITIAL_DB_SQL` env if provided.
- If `INITIAL_DB_SQL` is empty, it runs `packages/db/seed.sql`.

## Notes & next steps
- Prisma schema is in `packages/db/schema.prisma`. Generate client with `npx prisma generate --schema=packages/db/schema.prisma`
- To extend: add auth, LLM command processing, vector DB, OAuth integrations.

