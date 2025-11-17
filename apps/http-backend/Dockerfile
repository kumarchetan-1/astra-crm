FROM node:18-alpine
WORKDIR /app
# Install OpenSSL libraries for Prisma
RUN apk add --no-cache openssl openssl-dev
# Copy packages/db first (needed for Prisma schema)
COPY packages/db ./packages/db
# Copy http-backend files
COPY apps/http-backend/package*.json ./
COPY apps/http-backend/tsconfig.json ./
RUN npm ci --silent
COPY apps/http-backend ./
# generate prisma client using schema in packages/db
RUN npx prisma generate --schema=./packages/db/schema.prisma || true
RUN npm run build
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node","dist/index.js"]
