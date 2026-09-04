# Articles & Comments System

## Запуск Backend (Node.js + Express + PostgreSQL)
1. Перейдите в папку бэкенда: `cd backend`
2. Установите зависимости: `npm install`
3. Укажите доступы к БД в `config/config.json`
4. Выполните миграции: `npx sequelize-cli db:migrate`
5. Запустите сервер: `npm run dev` (запускается на http://localhost:3000)

## Запуск Frontend (Vue.js + Vuetify)
1. Перейдите в папку фронтенда: `cd frontend`
2. Установите зависимости: `npm install`
3. Запустите клиент: `npm run serve` (запускается на http://localhost:8080)