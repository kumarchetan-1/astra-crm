FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci --silent
COPY . .
# generate prisma client using schema in packages/db
RUN npm run prisma:generate || true
RUN npm run build
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node","dist/index.js"]
