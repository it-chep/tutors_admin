# ---- Stage 1: сборка приложения ----
FROM node:18-alpine AS builder
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./
RUN npm ci

# Копируем исходный код и собираем проект
COPY . .
RUN npm run build

# ---- Stage 2: раздача статики через serve ----
FROM node:18-alpine

# Устанавливаем serve глобально
RUN npm install -g serve

# Копируем собранные файлы из первого этапа
COPY --from=builder /app/build /app/build

# Указываем рабочую директорию, где лежит build
WORKDIR /app

# Открываем порт (совпадает с тем, что проброшен в docker-compose)
EXPOSE 3000

# Запускаем serve: -s означает SPA режим (перенаправление всех запросов на index.html)
CMD ["serve", "-s", "build", "-l", "3000"]